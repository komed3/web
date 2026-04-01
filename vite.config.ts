import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig ( () => {
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
        }
    };
} );
