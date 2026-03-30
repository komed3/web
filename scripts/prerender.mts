#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const distDir = join( __dirname, '..', 'dist' );
const dataDir = join( __dirname, '..', 'src', 'data' );

( async () => {
    if ( ! existsSync( distDir ) || ! existsSync( join( dataDir, 'repos.json' ) ) ) {
        console.log( `⚠ Skipping pre-render: missing dist or data` );
        return;
    }

    try {
        const repos = JSON.parse( readFileSync( join( dataDir, 'repos.json' ), 'utf-8' ) );
        const indexPath = join( distDir, 'index.html' );
        let html = readFileSync( indexPath, 'utf-8' );

        const pagesDir = join( distDir, 'project' );
        if ( ! existsSync( pagesDir ) ) mkdirSync( pagesDir, { recursive: true } );

        for ( const repo of repos ) {
            const mod = html.replace( '</head>', `<script>window.__PRERENDER_DATA__={project:'${repo.name}'};</script>\n</head>` );
            writeFileSync( join( pagesDir, `${repo.name}.html` ), mod );
        }

        console.log( `✓ Pre-rendered ${repos.length} project pages` );
    } catch ( err ) {
        console.warn( `⚠ Pre-render warning:`, err );
    }
} )();
