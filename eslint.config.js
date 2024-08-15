/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            '@tanstack/query': pluginQuery,
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',

            // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            // Tắt rule yêu cầu import React trong file jsx
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
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

            // Cảnh báo khi import sai
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['@mui/*/*/*'],
                    paths: ['lodash'],
                },
            ],
        },
    },
];
