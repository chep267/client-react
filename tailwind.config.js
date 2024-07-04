/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    important: '#root',
    theme: {
        extend: {},
    },
    plugins: [],
};
