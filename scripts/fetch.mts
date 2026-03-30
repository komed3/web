#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const dataDir = join( __dirname, '..', 'src', 'data' );

if ( ! existsSync( dataDir ) ) mkdirSync( dataDir, { recursive: true } );
