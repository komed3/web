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
    if ( ! token ) throw new Error( `TOKEN missing` );

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

async function getRepos ( blacklist: Set< string > ) : Promise< Repo[] > {
    console.log( `Fetching repos (GraphQL) ...` );

    const query = `
        query( $first: Int!, $after: String ) { user( login: "${USER}") { repositories(
            first: $first, after: $after, privacy: PUBLIC, isFork: false, isArchived: false,
            orderBy: { field: STARGAZERS, direction: DESC }
        ) {
            nodes {
                name, description, stargazerCount, url, updatedAt, primaryLanguage { name },
                object( expression: "HEAD:README.md" ) { ... on Blob { text } }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        } } }
    `;

    const repos: Repo[] = [];
    let after: string | null = null, hasNext = true;

    while ( hasNext && repos.length < MAX_REPOS ) {
        const data = await fetchGraphQL( query, { first: 50, after } );

        for ( const r of data.user.repositories.nodes ) {
            if ( blacklist.has( r.name.toLowerCase() ) || ! ( r.object?.text || '' ).length ) continue;

            repos.push( {
                name: r.name,
                description: r.description || '',
                stars: r.stargazerCount,
                language: r.primaryLanguage?.name || null,
                url: r.url,
                updatedAt: r.updatedAt,
                readme: r.object?.text || ''
            } );
        }

        hasNext = data.user.repositories.pageInfo.hasNextPage;
        after = data.user.repositories.pageInfo.endCursor;
    }

    repos.sort( ( a, b ) => {
        if ( b.stars !== a.stars ) return b.stars - a.stars;
        return new Date( b.updatedAt ).getTime() - new Date( a.updatedAt ).getTime();
    } );

    console.log( `${repos.length} repos after filtering` );
    return repos.slice( 0, MAX_REPOS );
}

function getSkills ( repos: Repo[] ) : string[] {
    const langs: Record< string, number > = {};
    for ( const r of repos ) if ( r.language ) langs[ r.language ] = ( langs[ r.language ] || 0 ) + 1;

    return Object.entries( langs ).sort( ( [ , a ], [ , b ] ) => b - a ).map( ( [ name ] ) => name );
}
