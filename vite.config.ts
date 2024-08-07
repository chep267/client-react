/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { visualizer } from 'rollup-plugin-visualizer';

/** module path */
import tsPaths from './tsconfig.path.json' with { type: 'json' };

/** Resolve tsconfig.json paths to alias key */
function resolveAlias() {
    const paths = tsPaths.compilerOptions.paths;
    const alias = {};
    for (const [key, value] of Object.entries(paths)) {
        const aKey = key.replace('/*', '');
        alias[aKey] = resolve(__dirname, value[0].replace('/*', ''));
    }
    return alias;
}

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
    const isDevMode = process.env.VITE_APP_MODE === 'dev';
    const port = Number(process.env.VITE_APP_PORT) || 8080;
    const host = process.env.VITE_APP_HOST;

    return defineConfig({
        plugins: [
            react({
                babel: {
                    configFile: true, // Use babel.config.js files
                },
                include: '**/*.tsx',
            }),
            basicSsl(),
            visualizer(),
        ],
        resolve: {
            alias: resolveAlias(),
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        build: {
            sourcemap: isDevMode,
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
