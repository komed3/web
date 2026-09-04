import { writeFile } from 'node:fs/promises';

import projects from '../data/projects.json';


const base = 'https://komed3.de';
const urls = [ '/', '/index', '/stack', ...projects.map( p => `/project/${ p.id }` ) ];
