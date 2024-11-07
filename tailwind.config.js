/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    important: '#root',
    theme: {
        extend: {
            fontFamily: {
                // quicksand: ['Quicksand', 'sans-serif'],
            },
            transitionProperty: {
                spacing: 'margin, padding',
            },
            colors: {
                // 'semi-black': '#0A0810',
                // 'neutral-black': '#222222',
                // error: '#cd0000',
                // main: '#f36c21',
            },
            lineHeight: {
                // custom: '1.1',
            },
        },
    },
    plugins: [],
};
