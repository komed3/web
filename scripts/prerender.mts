#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
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
        const repos = JSON.parse( await readFile( join( dataDir, 'repos.json' ), 'utf-8' ) );
        const indexPath = join( distDir, 'index.html' );
        let html = await readFile( indexPath, 'utf-8' );

        const pagesDir = join( distDir, 'project' );
        if ( ! existsSync( pagesDir ) ) await mkdir( pagesDir, { recursive: true } );

        for ( const repo of repos ) {
            const mod = html.replace( '</head>', `<script>window.__PRERENDER_DATA__={project:'${repo.name}'};</script>\n</head>` );
            await writeFile( join( pagesDir, `${repo.name}.html` ), mod );
        }

        console.log( `✓ Pre-rendered ${repos.length} project pages` );
    } catch ( err ) {
        console.warn( `⚠ Pre-render warning:`, err );
    }
} )();
