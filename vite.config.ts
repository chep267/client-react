/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { resolve } from 'node:path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { visualizer } from 'rollup-plugin-visualizer';

/** module path */
import tsPaths from './tsconfig.app.json' with { type: 'json' };

/** Resolve tsconfig.json paths to alias key */
function resolveAlias() {
    const paths = tsPaths.compilerOptions.paths;
    const alias = {} as Record<string, string>;
    for (const [key, value] of Object.entries(paths)) {
        const aKey = key.replace('/*', '');
        alias[aKey] = resolve(__dirname, value[0].replace('/*', ''));
    }
    return alias;
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
    const isDevMode = process.env.VITE_APP_MODE === 'dev';
    const port = Number(process.env.VITE_APP_PORT) || 8080;
    const host = process.env.VITE_APP_HOST;

    return defineConfig({
        plugins: [react(), basicSsl(), visualizer()],
        resolve: {
            alias: resolveAlias(),
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        build: {
            target: 'esnext',
            sourcemap: isDevMode,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'start-screen': ['./src/modules/module-auth/screens/StartScreen.vue'],
                        'auth-screen': ['./src/modules/module-auth/screens/AuthScreen.vue'],
                    },
                },
            },
        },
        server: {
            host,
            port,
            open: true, // auto open in browser
        },
        esbuild: {
            treeShaking: true,
            target: 'esnext',
            legalComments: 'none',
            format: 'esm',
        },
    });
};
