/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginQuery from '@tanstack/eslint-plugin-query';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tsEslint.config({
    ignores: ['dist/*', 'dist/assets/*', 'node_modules/*'],
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,vue}'],
    extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],
    plugins: {
        react: pluginReact,
        prettier: pluginPrettier,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        '@tanstack/query': pluginQuery,
    },
    languageOptions: {
        ecmaVersion: 'latest',
        globals: globals.browser,
        parserOptions: {
            parser: '@typescript-eslint/parser',
        },
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/jsx-uses-react': 'off', // Tắt rule yêu cầu import React trong file jsx
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Cảnh báo biến không dùng
        'react/jsx-no-target-blank': 'warn', // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
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

        // Cảnh báo khi import sai
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@mui/*/*/*'],
                paths: ['lodash'],
            },
        ],
    },
});
