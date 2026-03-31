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


const cwd = dirname( fileURLToPath( import.meta.url ) );
const dataDir = join( cwd, '..', 'src', 'data' );
if ( ! existsSync( dataDir ) ) mkdirSync( dataDir, { recursive: true } );

async function readConfig () : Promise< Config > {
    const file = join( cwd, 'config.json' );
    if ( ! existsSync( file ) ) throw new Error( `⚠ Cannot open config file!` );

    try {
        const config = JSON.parse( await readFile( file, 'utf-8' ) );
        return config as Config;
    } catch ( e ) {
        throw new Error( `⚠ Error while reading config:`, e as unknown as Error );
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

async function fetchOrgs ( orgs: string[] ) : Promise< Record< string, Org > > {
    if ( ! orgs.length ) return {};

    console.log( `Fetching orgs ...` );

    const query = ``;
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

    const orgs: string[] = [], repos: Array< [ string, string ] > = [];
    for ( const { github } of config.projects ) {
        if ( ! github ) continue;

        if ( github.includes( '/' ) ) repos.push( github.split( '/' ) as [ string, string ] );
        else orgs.push( github );
    }

    const orgData = await fetchOrgs( orgs );
    const repoData = await fetchRepos( repos );

    //
} )();
