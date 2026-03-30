#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const dataDir = join( __dirname, '..', 'src', 'data' );
if ( ! existsSync( dataDir ) ) mkdirSync( dataDir, { recursive: true } );

const USER = 'komed3';
const GRAPHQL_URL = 'https://api.github.com/graphql';
const MAX_REPOS = 100;

interface Repo {
    name: string;
    description: string;
    stars: number;
    language: string | null;
    url: string;
    updatedAt: string;
    readme: string;
}

function loadBlacklist () : Set< string > {
    const file = join( __dirname, 'blacklist.json' );
    if ( ! existsSync( file ) ) return new Set();

    try {
        const list = JSON.parse( readFileSync( file, 'utf-8' ) );
        return new Set( list.map( ( s: string ) => s.toLowerCase() ) );
    } catch {
        console.warn( `Invalid 'blacklist.json' – ignored` );
        return new Set();
    }
}

async function fetchGraphQL ( query: string, variables?: Record< string, unknown > ) {
    const token = process.env.TOKEN;
    if ( ! token ) throw new Error( 'TOKEN missing' );

    const res = await fetch( GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify( { query, variables } )
    } );

    if ( ! res.ok ) throw new Error( `GitHub API: ${res.status}` );

    const data = await res.json();
    if ( data.errors ) throw new Error( data.errors.map( ( e: any ) => e.message ).join( ', ' ) );

    return data.data;
}

function getSkills ( repos: Repo[] ) : string[] {
    const langs: Record< string, number > = {};
    for ( const r of repos ) if ( r.language ) langs[ r.language ] = ( langs[ r.language ] || 0 ) + 1;

    return Object.entries( langs ).sort( ( [ , a ], [ , b ] ) => b - a ).map( ( [ name ] ) => name );
}
