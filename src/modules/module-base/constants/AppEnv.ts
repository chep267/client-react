/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const AppEnv = {
    appMode: import.meta.env.VITE_APP_MODE,
    appName: import.meta.env.VITE_APP_NAME,
    apiHost: import.meta.env.VITE_APP_API_HOST,
    apiType: import.meta.env.VITE_APP_API_TYPE,
    isFirebase: import.meta.env.VITE_APP_API_TYPE === 'firebase',
    appTheme: import.meta.env.VITE_APP_THEME,
    appLocale: import.meta.env.VITE_APP_LOCALE,
};
