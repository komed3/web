#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import projects from '../data/projects.json';


const base = 'https://komed3.de';
const urls = [ '/', '/index', '/stack', ...projects.map( p => `/project/${ p.id }` ) ];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ urls.map( url => `  <url><loc>${ base }${ url }</loc></url>` ).join( '\n' ) }
</urlset>
`;

await writeFile( join( process.cwd(), 'public/sitemap.xml' ), sitemap, 'utf8' );
