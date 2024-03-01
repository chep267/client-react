/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

const width_app_bar_collapse = '75px';
const width_app_bar_expand = '288px';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    important: '#root',
    theme: {
        extend: {
            width: {
                'app-bar-collapse': width_app_bar_collapse,
                'app-bar-expand': width_app_bar_expand,
                'app-main-app-bar-expand': `calc(100% - ${width_app_bar_expand})`,
                'app-main-app-bar-collapse': `calc(100% - ${width_app_bar_collapse})`,
            },
        },
    },
    plugins: [],
};
