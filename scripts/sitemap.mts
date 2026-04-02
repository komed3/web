#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';


const DOMAIN = 'https://komed3.de';
const cwd = dirname( fileURLToPath( import.meta.url ) );
const projectsFile = join( cwd, '..', 'src', 'data', 'projects.json' );
const sitemapFile = join( cwd, '..', 'public', 'sitemap.xml' );

async function generateSitemap () {
    console.log( 'Generating sitemap ...' );

    try {
        const projectsData = JSON.parse( await readFile( projectsFile, 'utf-8' ) );
        const projects = Array.isArray( projectsData ) ? projectsData : [];

        const urls = [ { loc: `${DOMAIN}/`, lastmod: new Date().toISOString().split( 'T' )[0], changefreq: 'daily', priority: '1.0' } ];
        for ( const project of projects ) urls.push( {
            loc: `${DOMAIN}/#/project/${project.id}`,
            lastmod: new Date().toISOString().split( 'T' )[0],
            changefreq: 'weekly', priority: '0.8'
        } );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
            `${ urls.map( url => `<url>` +
                `<loc>${url.loc}</loc>` +
                `<lastmod>${url.lastmod}</lastmod>` +
                `<changefreq>${url.changefreq}</changefreq>` +
                `<priority>${url.priority}</priority>` +
            `</url>` ).join( '\n' ) }` +
        `</urlset>`;

        await writeFile( sitemapFile, xml, 'utf-8' );
        console.log( `✓ Sitemap generated: ${urls.length} URLs` );
    } catch ( error ) {
        console.error( '⚠ Error generating sitemap:', error );
        process.exit( 1 );
    }
}

generateSitemap();
