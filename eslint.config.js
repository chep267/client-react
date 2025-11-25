/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default tsEslint.config({
    ignores: ['dist/*', 'dist/assets/*', 'node_modules/*'],
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,vue}'],
    extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],
    plugins: {
        react: pluginReact,
        prettier: pluginPrettier,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
        '@tanstack/query': pluginQuery,
    },
    languageOptions: {
        ecmaVersion: 'latest',
        parserOptions: {
            parser: '@typescript-eslint/parser',
        },
    },
    rules: {
        ...pluginReactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'react/jsx-no-target-blank': 'warn',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'import/no-named-as-default': 'off',
        'no-case-declarations': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react-hooks/exhaustive-deps': 'off',

        // intl
        // 'formatjs/no-offset': 'error',

        // @tanstack/query
        '@tanstack/query/exhaustive-deps': 'off',
        '@tanstack/query/no-rest-destructuring': 'warn',
        '@tanstack/query/stable-query-client': 'error',

        'no-restricted-imports': [
            'error',
            {
                patterns: ['@mui/*/*/*'],
                paths: ['lodash'],
            },
        ],
    },
});
