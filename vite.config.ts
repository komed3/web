import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig ( () => {
    const build = new Date().toISOString().slice( 0, 16 ).replace( /[-:]/g, '' ).replace( 'T', '-' );
    const commit = execSync( 'git rev-parse --short HEAD' ).toString().trim();

    return {
        plugins: [ react(), tailwindcss() ],
        resolve: { alias: { '@': resolve( __dirname, '.' ) } },
        build: {
            chunkSizeWarningLimit: 2000,
            cssCodeSplit: true,
            rollupOptions: { output: { manualChunks ( id ) {
                if ( id.includes( 'node_modules' ) ) {
                    if ( id.includes( 'syntax-highlighter' ) ) return 'syntax';
                    if ( id.includes( 'markdown' ) || id.includes( 'gfm' ) ) return 'md';
                    if ( id.includes( 'motion' ) ) return 'motion';
                    if ( id.includes( 'react' ) ) return 'react';
                    if ( id.includes( 'lucide' ) || id.includes( 'simple-icons' ) ) return 'icons';
                    return 'vendor';
                }
            } } }
        },
        define: {
            'process.env.VITE_BUILD_ID': JSON.stringify( build ),
            'process.env.VITE_COMMIT_SHA': JSON.stringify( commit )
        }
    };
} );
