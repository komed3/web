#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const distDir = join( __dirname, '..', 'dist' );

( async () => {
    console.log( `Verifying static build ...` );

    let ok = true;

    for ( const check of [
        { p: 'index.html', d: 'Home page' },
        { p: 'assets', d: 'Assets folder' },
        { p: 'project', d: 'Project pages' },
    ] ) {
        const full = join( distDir, check.p );
        const exists = existsSync( full );
        console.log( `${ exists ? '✓' : '✗' } ${check.d}` );

        if ( ! exists ) ok = false;
    }

    if ( existsSync( join( distDir, 'assets' ) ) ) {
        const files = await readdir( join( distDir, 'assets' ) );
        console.log(
            `✓ Assets: ${ files.filter( f => f.endsWith( '.js' ) ).length } JS + ` +
            `${ files.filter( f => f.endsWith( '.css' ) ).length } CSS`
        );
    }

    if ( existsSync( join( distDir, 'project' ) ) ) {
        const files = await readdir( join( distDir, 'project' ) );
        console.log(
            `✓ Project pages: ${ files.filter( f => f.endsWith( '.html' ) ).length } HTML files`
        );
    }

    if ( ok ) console.log( `✓ Ready for deployment!` );
    else process.exit( 1 );
} )();
