/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import pluginReact from '@vitejs/plugin-react-swc';
import pluginBasicSsl from '@vitejs/plugin-basic-ssl';
import pluginTailwindcss from '@tailwindcss/vite';
import pluginViteCompression from 'vite-plugin-compression';
import { visualizer as pluginVisualizer } from 'rollup-plugin-visualizer';

/** module path */
import tsPaths from './tsconfig.app.json' with { type: 'json' };

/** Resolve tsconfig.json paths to alias key */
function resolveAlias() {
    const paths = Object.entries(tsPaths.compilerOptions.paths);
    const alias = {} as Record<string, string>;
    for (let i = 0, n = paths.length; i < n; ++i) {
        const [key, value] = paths[i];
        const aKey = key.replace('/*', '');
        alias[aKey] = resolve(__dirname, value[0].replace('/*', ''));
    }
    return alias;
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
    const config = {
        isDevMode: process.env.VITE_APP_MODE === 'dev',
        port: Number(process.env.VITE_APP_PORT) || 3000,
        host: process.env.VITE_APP_HOST || 'localhost',
        isGzip: process.env.VITE_APP_BUILD_GZIP === 'true',
    };
    return defineConfig({
        plugins: [
            pluginReact(),
            pluginBasicSsl(),
            pluginTailwindcss(),
            // Gzip compression for production builds
            config.isGzip
                ? pluginViteCompression({
                      algorithm: 'gzip', // Use gzip compression
                      ext: '.gz', // Output extension
                      threshold: 10240, // Only compress files larger than 10KB
                      deleteOriginFile: false, // Keep original files
                  })
                : undefined,
            pluginVisualizer({ filename: 'stats.html', open: false }),
        ],
        resolve: {
            alias: resolveAlias(),
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        esbuild: {
            target: 'esnext', // Target modern browsers that support ES Modules
            treeShaking: true, // Remove unnecessary code
            minifySyntax: true, // Minify syntax while preserving ES Modules
            legalComments: 'none', // Remove comments
            format: 'esm',
        },
        build: {
            outDir: 'dist', // Output directory
            target: 'esnext', // Target modern browsers
            minify: 'esbuild', // Enable minification
            sourcemap: false, // Generate sourcemaps (optional, disable for smaller builds)
            chunkSizeWarningLimit: 500, // Set maximum chunk size (in bytes)
            assetsInlineLimit: 4096,
            cssCodeSplit: true, // Enable CSS code splitting
            commonjsOptions: {
                transformMixedEsModules: true, // Enable tree-shaking
            },
            rollupOptions: {
                output: {
                    minifyInternalExports: true, // Minify output
                    compact: true, // Compact output
                },
            },
        },
        server: {
            host: config.host,
            port: config.port,
            open: config.isDevMode,
        },
        optimizeDeps: {
            esbuildOptions: { target: 'esnext', treeShaking: true },
        },
    });
};
