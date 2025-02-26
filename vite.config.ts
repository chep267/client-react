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
        plugins: [react(), basicSsl(), visualizer(), tailwindcss()],
        resolve: {
            alias: resolveAlias(),
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        build: {
            target: 'esnext',
            sourcemap: config.isDevMode,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'start-screen': ['./src/modules/module-auth/screens/StartScreen/index.tsx'],
                        'auth-screen': ['./src/modules/module-auth/screens/AuthScreen/index.tsx'],
                        'main-screen': ['./src/modules/module-global/screens/MainScreen/index.tsx'],
                        'not-found-screen': ['./src/modules/module-global/screens/NotFoundScreen/index.tsx'],
                        'feed-screen': ['./src/modules/module-global/screens/TestScreen/index.tsx'],
                        'calendar-screen': ['./src/modules/module-calendar/screens/CalendarScreen/index.tsx'],
                    },
                },
            },
        },
        server: {
            host: config.host,
            port: config.port,
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
