import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';


function postBuildPlugin () : Plugin {
    return { name: 'post-build', apply: 'build', closeBundle () {
        console.log( `Pre-rendering ...` );

        try { execSync( 'tsx scripts/prerender.mts', { stdio: 'inherit' } ) }
        catch { console.warn( `⚠ Pre-render skipped!` ) }
    } };
}

export default defineConfig ( () => {
    return {
        plugins: [ react(), tailwindcss(), postBuildPlugin() ],
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
