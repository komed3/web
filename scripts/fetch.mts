#!/usr/bin/env node

import { type ArrayMode, Merger } from '@komed3/deepmerge';
import { existsSync, mkdirSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Config, Org, Project, Repo } from '@/shared/types';


// --- prepare ---

const cwd = dirname( fileURLToPath( import.meta.url ) );
const dir = join( cwd, '..', 'data' );
if ( ! existsSync( dir ) ) mkdirSync( dir, { recursive: true } );

// ---- config loader ----

async function readConfig () : Promise< Config > {
  const file = join( cwd, 'config.json' );
  if ( ! existsSync( file ) ) throw new Error( 'Cannot open config file!' );

  try { return JSON.parse( await readFile( file, 'utf-8' ) ) as Config }
  catch ( e: unknown ) { throw new Error( `Error while reading config: ${ ( e as Error ).message }` ) }
}

// ---- normalize version ----

function normalizeVersion ( input?: string | undefined ) : string | undefined {
  if ( ! input ) return undefined;

  let v = input.trim().replace( /^(?:v(?:er(?:s(?:ion)?)?)?)[\s.\-_]*/i, '' ).replace( /^[^\d]*/, '' );
  const match = v.match( /\d+(?:\.\d+)*(?:[-._]?[a-z0-9]+)*/i );

  return match ? match[ 0 ] : undefined;
}

// ---- pathfix ----

function fixRelativePaths ( content: string, owner: string, name: string, branch: string ) : string {
  const rawBase = `https://raw.githubusercontent.com/${ owner }/${ name }/${ branch }`;
  const githubBase = `https://github.com/${ owner }/${ name }/blob/${ branch }`;

  return content
    // fix Markdown links and images
    .replace( /(!?\[.*?\]\()([^)]+)(\))/g, ( match, prefix, path, suffix ) => {
      if ( /^(?:[a-z]+:\/\/|#|data:)/i.test( path ) ) return match;

      let cleanPath = path.replace( /^\.\//, '' );
      if ( cleanPath.startsWith( '/' ) ) cleanPath = cleanPath.substring( 1 );

      const isImage = prefix.startsWith( '!' );
      const baseUrl = isImage ? rawBase : githubBase;

      return `${ prefix }${ baseUrl }/${ cleanPath }${ suffix }`;
    } )
    // fix HTML tags (minimal support)
    .replace( /(src|href)=["']((?!\w+:\/\/|#|data:)[^"']+)["']/g, ( _, attr, path ) => {
      let cleanPath = path.replace( /^\.\//, '' );
      if ( cleanPath.startsWith( '/' ) ) cleanPath = cleanPath.substring( 1 );

      const isImage = attr === 'src';
      const baseUrl = isImage ? rawBase : githubBase;

      return `${ attr }="${ baseUrl }/${ cleanPath }"`;
    } );
}

// ---- GitHub API ----

async function fetchGraphQL ( query: string, variables?: Record< string, unknown > ) {
  const token = process.env.TOKEN;
  if ( ! token ) throw new Error( 'TOKEN missing' );

  const res = await fetch( 'https://api.github.com/graphql', {
    method: 'POST', body: JSON.stringify( { query, variables } ), headers: {
      'Content-Type': 'application/json', 'Authorization': `Bearer ${ token }`
    }
  } );

  if ( ! res.ok ) throw new Error( `GitHub API: ${ res.status }` );

  const data = await res.json();
  if ( data.errors ) throw new Error( data.errors.map( ( e: Error ) => e.message ).join( ', ' ) );

  return data.data;
}

async function fetchOrgs ( orgs: string[] ) : Promise< Record< string, Org > > {
  if ( ! orgs.length ) return {};

  console.log( `Fetching orgs (${ orgs.length }) ...` );

  const result: Record< string, Org > = {};
  const state = orgs.map( org => ( {
    org, after: null as string | null, done: false, repos: 0, stars: 0,
    langs: {} as Record< string, number >, meta: null as any
  } ) );

  while ( state.some( s => ! s.done ) ) {
    const data = await fetchGraphQL( `query {
      ${ state.map( ( s, i ) => {
        if ( s.done ) return '';
        return `org${ i }: organization( login: "${ s.org }" ) {
          name, description, websiteUrl,
          repositories( first: 100, after: ${ s.after ? `"${ s.after }"` : null }, isFork: false ) {
            nodes { stargazerCount, primaryLanguage { name } },
            pageInfo { hasNextPage, endCursor }
          }
        }`;
      } ).join( '\n' ) }
    }` );

    state.forEach( ( s, i ) => {
      if ( s.done ) return;

      const o = data[ `org${ i }` ];
      if ( ! o ) { s.done = true; return }

      if ( ! s.meta ) s.meta = {
        title: o.name || s.org,
        link: o.websiteUrl,
        desc: o.description || ''
      };

      for ( const r of o.repositories.nodes ) {
        s.repos++;
        s.stars += r.stargazerCount;

        const lang = r.primaryLanguage?.name;
        if ( lang ) s.langs[ lang ] = ( s.langs[ lang ] || 0 ) + 1;
      }

      if ( o.repositories.pageInfo.hasNextPage ) s.after = o.repositories.pageInfo.endCursor;
      else {
        s.done = true;

        result[ s.org ] = {
          title: s.meta.title,
          desc: s.meta.desc,
          tags: Object.keys( s.langs ),
          link: s.meta.link,
          meta: {
            stars: s.stars,
            langs: Object.keys( s.langs ),
            repos: s.repos
          }
        };
      }
    } );
  }

  console.log( `✓ ${ Object.keys( result ).length } orgs fetched` );
  return result;
}

async function fetchRepos ( repos: Array< [ string, string ] > ) : Promise< Record< string, Repo > > {
  if ( ! repos.length ) return {};

  console.log( `Fetching repos (${ repos.length }) ...` );
  const result: Record< string, Repo > = {};

  for ( let i = 0; i < repos.length; i += 20 ) {
    const batch = repos.slice( i, i + 20 );

    const data = await fetchGraphQL( `query {
      ${ batch.map( ( [ owner, name ], j ) => `
        repo${ j }: repository( owner: "${ owner }", name: "${ name }" ) {
          name, description, homepageUrl, stargazerCount, licenseInfo { spdxId },
          createdAt, primaryLanguage { name }, latestRelease { tagName }, defaultBranchRef { name },
          repositoryTopics( first: 10 ) { nodes { topic { name } } },
          object( expression: "HEAD:README.md" ) { ... on Blob { text } },
          refs( refPrefix: "refs/tags/", first: 1, orderBy: { field: TAG_COMMIT_DATE, direction: DESC } ) { nodes { name } }
        }
      ` ).join( '\n' ) }
    }` );

    batch.forEach( ( [ owner, name ], j ) => {
      const r = data[ `repo${ j }` ];
      if ( ! r ) return;

      const langs = r.primaryLanguage?.name ? [ r.primaryLanguage.name ] : [];
      const branch = r.defaultBranchRef?.name || 'main';
      const content = r.object?.text || '';

      result[ `${ owner }/${ name }` ] = {
        title: r.name,
        desc: r.description || '',
        tags: r.repositoryTopics?.nodes?.map( ( t: any ) => t.topic.name ) || [],
        link: r.homepageUrl,
        content: fixRelativePaths( content, owner, name, branch ),
        meta: {
          stars: r.stargazerCount, license: r.licenseInfo?.spdxId, langs,
          year: new Date( r.createdAt ).getFullYear(),
          version: normalizeVersion( r.latestRelease?.tagName || r.refs?.nodes?.[ 0 ]?.name )
        }
      };
    } );
  }

  console.log( `✓ ${ Object.keys( result ).length } repos fetched` );
  return result;
}

// ---- runner ----

( async () => {
  const config = await readConfig(), merger = new Merger( { arrayMode: 'replace-right' as ArrayMode } );
  const orgs: string[] = [], repos: Array< [ string, string ] > = [];

  for ( const { github } of config.projects ) {
    if ( ! github ) continue;

    if ( github.includes( '/' ) ) repos.push( github.split( '/' ) as [ string, string ] );
    else orgs.push( github );
  }

  const data = { ...await fetchOrgs( orgs ), ...await fetchRepos( repos ) };
  const projects: Project[] = [];

  for ( const project of config.projects ) projects.push( merger.merge< Project >(
    {} as Project, project.github ? data[ project.github ] : undefined, project
  ) );

  await writeFile( join( dir, 'projects.json' ), JSON.stringify( projects, null, 2 ), 'utf-8' );
} )();
