#!/usr/bin/env node

import {} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const distDir = join( __dirname, '..', 'dist' );
