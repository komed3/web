#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';


export interface Config {
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
            year?: number;
        };
    } >;
    skills: string[];
}

const cwd = dirname( fileURLToPath( import.meta.url ) );
const dataDir = join( cwd, '..', 'src', 'data' );
if ( ! existsSync( dataDir ) ) mkdirSync( dataDir, { recursive: true } );

async function readConfig () : Promise< Config > {
    const file = join( cwd, 'config.json' );
    if ( ! existsSync( file ) ) throw new Error( `⚠ Cannot open config file!` );

    try {
        const config = JSON.parse( await readFile( file, 'utf-8' ) );
        return config as Config;
    } catch ( err ) {
        throw new Error( `⚠ Error while reading config:`, err as unknown as Error );
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
    if ( data.errors ) throw new Error( data.errors.map( ( e: any ) => e.message ).join( ', ' ) );

    return data.data;
}

( async () => {
    //
} )();
