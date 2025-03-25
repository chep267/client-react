/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';

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
    };
    return defineConfig({
        plugins: [react(), basicSsl(), tailwindcss(), visualizer({ filename: 'dist/stats.html' })],
        resolve: {
            alias: resolveAlias(),
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        esbuild: {
            treeShaking: true,
            target: 'esnext',
            legalComments: 'none',
            format: 'esm',
        },
        build: {
            target: 'esnext',
            minify: 'esbuild',
            sourcemap: false,
            cssCodeSplit: true,
            chunkSizeWarningLimit: 500,
            assetsInlineLimit: 4096,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('react')) return 'react'; // React riêng
                            if (id.includes('@mui')) return 'mui'; // MUI riêng
                            if (id.includes('lodash')) return 'lodash'; // Lodash riêng
                            if (id.includes('firebase')) return 'firebase'; // Lodash riêng
                            return 'vendor'; // Các thư viện khác
                        }
                    },
                    format: 'es',
                },
                treeshake: true,
            },
        },
        server: {
            host: config.host,
            port: config.port,
            open: config.isDevMode,
        },
        optimizeDeps: {
            exclude: ['react', 'react-dom'], // Không bundle React vào app
            esbuildOptions: { target: 'esnext', treeShaking: true },
        },
    });
};
