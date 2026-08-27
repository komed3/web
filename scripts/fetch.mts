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


const cwd = dirname( fileURLToPath( import.meta.url ) );
const dir = join( cwd, '..', 'src', 'data' );
if ( ! existsSync( dir ) ) mkdirSync( dir, { recursive: true } );


// ---- CONFIG ----

async function readConfig () : Promise< Config > {
  const file = join( cwd, 'config.json' );
  if ( ! existsSync( file ) ) throw new Error( `Cannot open config file!` );

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
