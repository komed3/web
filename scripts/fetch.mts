#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';


const cwd = dirname( fileURLToPath( import.meta.url ) );
const dir = join( cwd, '..', 'src', 'data' );
if ( ! existsSync( dir ) ) mkdirSync( dir, { recursive: true } );


// ---- CONFIG ----

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