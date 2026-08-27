#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';


interface Config {
  projects: Array< {
    id: string;
    title?: string;
    type: string;
    desc?: string;
    tags?: string[];
    link?: string;
    github?: string;
    content?: string;
    status?: string;
    meta?: {
      stars?: number;
      license?: string;
      langs?: string[];
      year?: number;
      version?: string;
    };
  } >;
}

interface Org {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  meta: {
    stars: number;
    langs: string[];
    repos: number;
  };
}


const cwd = dirname( fileURLToPath( import.meta.url ) );
const dir = join( cwd, '..', 'src', 'data' );
if ( ! existsSync( dir ) ) mkdirSync( dir, { recursive: true } );


// ---- CONFIG ----

async function readConfig () : Promise< Config > {
  const file = join( cwd, 'config.json' );
  if ( ! existsSync( file ) ) throw new Error( 'Cannot open config file!' );

  try { return JSON.parse( await readFile( file, 'utf-8' ) ) as Config }
  catch ( e: any ) { throw new Error( `Error while reading config: ${ e.message }` ) }
}

// ---- NORMALIZE ----

function normalizeVersion ( input?: string | undefined ) : string | undefined {
  if ( ! input ) return undefined;

  let v = input.trim().replace( /^(?:v(?:er(?:s(?:ion)?)?)?)[\s.\-_]*/i, '' ).replace( /^[^\d]*/, '' );
  const match = v.match( /\d+(?:\.\d+)*(?:[-._]?[a-z0-9]+)*/i );

  return match ? match[ 0 ] : undefined;
}

// ---- PATH FIXER ----

function fixRelativePaths ( content: string, owner: string, name: string, branch: string ) : string {
  const rawBase = `https://raw.githubusercontent.com/${ owner }/${ name }/${ branch }`;
  const githubBase = `https://github.com/${ owner }/${ name }/blob/${ branch }`;

  return content
    // Fix Markdown links and images
    .replace( /(!?\[.*?\]\()([^)]+)(\))/g, ( match, prefix, path, suffix ) => {
      if ( /^(?:[a-z]+:\/\/|#|data:)/i.test( path ) ) return match;

      let cleanPath = path.replace( /^\.\//, '' );
      if ( cleanPath.startsWith( '/' ) ) cleanPath = cleanPath.substring( 1 );

      const isImage = prefix.startsWith( '!' );
      const baseUrl = isImage ? rawBase : githubBase;

      return `${ prefix }${ baseUrl }/${ cleanPath }${ suffix }`;
    } )
    // Fix HTML tags (minimal support)
    .replace( /(src|href)=["']((?!\w+:\/\/|#|data:)[^"']+)["']/g, ( _, attr, path ) => {
      let cleanPath = path.replace( /^\.\//, '' );
      if ( cleanPath.startsWith( '/' ) ) cleanPath = cleanPath.substring( 1 );

      const isImage = attr === 'src';
      const baseUrl = isImage ? rawBase : githubBase;

      return `${ attr }="${ baseUrl }/${ cleanPath }"`;
    } );
}

// ---- GITHUB API ----

async function fetchGraphQL ( query: string, variables?: Record< string, unknown > ) {
  const token = process.env.TOKEN;
  if ( ! token ) throw new Error( 'TOKEN missing' );

  const res = await fetch( 'https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    },
    body: JSON.stringify( { query, variables } )
  } );

  if ( ! res.ok ) throw new Error( `GitHub API: ${ res.status }` );

  const data = await res.json();
  if ( data.errors ) throw new Error( data.errors.map( ( e: Error ) => e.message ).join( ', ' ) );

  return data.data;
}
