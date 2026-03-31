#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Merger } from '@komed3/deepmerge';


interface Config {
    projects: Array< {
        id: string;
        title?: string;
        type: string;
        description?: string;
        tags?: string[];
        link?: string;
        github?: string;
        content?: string;
        color?: string;
        meta?: {
            stars?: number;
            license?: string;
            langs?: string[];
            year?: number;
        };
    } >;
    skills: string[];
}

interface Org {
    title: string;
    description: string;
    tags: string[];
    link: string;
    meta: {
        stars: number;
        langs: string[];
        repos: number;
    };
}

interface Repo {
    title: string;
    description: string;
    tags: string[];
    link: string;
    content?: string;
    meta: {
        stars: number;
        license?: string;
        langs: string[];
        year: number;
    };
}

interface Project {
    id: string;
    title: string;
    type: string;
    description?: string;
    tags?: string[];
    link?: string;
    github?: string;
    content?: string;
    color: string;
    meta: {
        stars?: number;
        license?: string;
        langs?: string[];
        year?: number;
        repos?: number;
    };
}

type Projects = Project[];

type Skills = Array< {
    skill: string;
    color: string;
} >;


const cwd = dirname( fileURLToPath( import.meta.url ) );
const dir = join( cwd, '..', 'src', 'data' );
if ( ! existsSync( dir ) ) mkdirSync( dir, { recursive: true } );

function colorFromString ( str: string ) : string {
    const colors = [ 'brutal-yellow', 'brutal-green', 'brutal-blue', 'brutal-pink', 'brutal-orange' ];
    let hash = 0;

    for ( let i = 0; i < str.length; i++ ) hash = ( hash * 31 + str.charCodeAt( i ) ) | 0;
    return colors[ Math.abs( hash ) % colors.length ];
}

async function readConfig () : Promise< Config > {
    const file = join( cwd, 'config.json' );
    if ( ! existsSync( file ) ) throw new Error( `⚠ Cannot open config file!` );

    try {
        const config = JSON.parse( await readFile( file, 'utf-8' ) );
        return config as Config;
    } catch ( e ) {
        throw new Error( `⚠ Error while reading config: ${ ( e as Error ).message }` );
    }
}

async function fetchGraphQL ( query: string, variables?: Record< string, unknown > ) {
    const token = process.env.TOKEN;
    if ( ! token ) throw new Error( `⚠ TOKEN missing` );

    const res = await fetch( 'https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify( { query, variables } )
    } );

    if ( ! res.ok ) throw new Error( `⚠ GitHub API: ${res.status}` );

    const data = await res.json();
    if ( data.errors ) throw new Error( data.errors.map( ( e: Error ) => e.message ).join( ', ' ) );

    return data.data;
}

async function fetchOrgs ( orgs: string[] ) : Promise< Record< string, Org > > {
    if ( ! orgs.length ) return {};

    console.log( `Fetching orgs (${orgs.length}) ...` );

    const result: Record< string, Org > = {};
    const state = orgs.map( org => ( {
        org, after: null as string | null, done: false, repos: 0, stars: 0,
        langs: {} as Record< string, number >, meta: null as any
    } ) );

    while ( state.some( s => ! s.done ) ) {
        const data = await fetchGraphQL( `query {
            ${ state.map( ( s, i ) => {
                if ( s.done ) return '';
                return `org${i}: organization( login: "${s.org}" ) {
                    name, description, url,
                    repositories( first: 100, after: ${ s.after ? `"${s.after}"` : null }, isFork: false ) {
                        nodes { stargazerCount, primaryLanguage { name } },
                        pageInfo { hasNextPage, endCursor }
                    }
                }`;
            } ).join( '\n' ) }
        }` );

        state.forEach( ( s, i ) => {
            if ( s.done ) return;

            const o = data[ `org${i}` ];
            if ( ! o ) { s.done = true; return }

            if ( ! s.meta ) s.meta = {
                title: o.name || s.org,
                description: o.description || '',
                link: o.url
            };

            for ( const r of o.repositories.nodes ) {
                s.repos++;
                s.stars += r.stargazerCount;

                const lang = r.primaryLanguage?.name;
                if ( lang ) s.langs[ lang ] = ( s.langs[ lang ] || 0 ) + 1;
            }

            if ( o.repositories.pageInfo.hasNextPage ) {
                s.after = o.repositories.pageInfo.endCursor;
            } else {
                s.done = true;

                result[ s.org ] = {
                    title: s.meta.title,
                    description: s.meta.description,
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

    console.log( `Fetching repos (${repos.length}) ...` );
    const result: Record< string, Repo > = {};

    for ( let i = 0; i < repos.length; i += 20 ) {
        const batch = repos.slice( i, i + 20 );

        const data = await fetchGraphQL( `query {
            ${ batch.map( ( [ owner, name ], j ) => `
                repo${j}: repository( owner: "${owner}", name: "${name}" ) {
                    name, description, url, stargazerCount, licenseInfo { spdxId },
                    createdAt, primaryLanguage { name },
                    repositoryTopics( first: 10 ) { nodes { topic { name } } },
                    object( expression: "HEAD:README.md" ) { ... on Blob { text } }
                }
            ` ).join( '\n' ) }
        }` );

        batch.forEach( ( [ owner, name ], j ) => {
            const r = data[ `repo${j}` ];
            if ( ! r ) return;

            const langs = r.primaryLanguage?.name ? [ r.primaryLanguage.name ] : [];

            result[ `${owner}/${name}` ] = {
                title: r.name,
                description: r.description || '',
                tags: r.repositoryTopics?.nodes?.map( ( t: any ) => t.topic.name ) || [],
                link: r.url,
                content: r.object?.text || '',
                meta: {
                    stars: r.stargazerCount,
                    license: r.licenseInfo?.spdxId,
                    langs,
                    year: new Date( r.createdAt ).getFullYear()
                }
            };
        } );
    }

    console.log( `✓ ${ Object.keys( result ).length } repos fetched` );
    return result;
}

( async () => {
    const config = await readConfig();
    const merger = new Merger();

    const orgs: string[] = [], repos: Array< [ string, string ] > = [];
    for ( const { github } of config.projects ) {
        if ( ! github ) continue;

        if ( github.includes( '/' ) ) repos.push( github.split( '/' ) as [ string, string ] );
        else orgs.push( github );
    }

    const data = { ...await fetchOrgs( orgs ), ...await fetchRepos( repos ) };
    const projects: Projects = [], skills: Skills = [];

    for ( const project of config.projects ) projects.push( merger.merge< Project >(
        { color: colorFromString( project.id ) } as any,
        project.github ? data[ project.github ] : undefined,
        project
    ) );

    for ( const skill of config.skills ) skills.push( { skill, color: colorFromString( skill ) } );

    await writeFile( join( dir, 'projects.json' ), JSON.stringify( projects, null, 2 ), 'utf-8' );
    await writeFile( join( dir, 'skills.json' ), JSON.stringify( skills, null, 2 ), 'utf-8' );
} )();
