import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig ( () => {
    return {
        plugins: [ react(), tailwindcss() ],
        resolve: { alias: { '@': resolve( __dirname, '.' ) } },
        build: {
            cssCodeSplit: true,
            rollupOptions: { output: { manualChunks ( id ) {
                if ( id.includes( 'node_modules' ) ) return 'vendor';
            } } },
            chunkSizeWarningLimit: 800
        }
    };
} );
