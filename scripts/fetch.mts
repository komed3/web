#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const dataDir = join( __dirname, '..', 'src', 'data' );

if ( ! existsSync( dataDir ) ) mkdirSync( dataDir, { recursive: true } );

const GITHUB_USER = 'komed3';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
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
