/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const AppEnv = {
    apiHost: import.meta.env.VITE_APP_API_HOST,
    apiType: import.meta.env.VITE_APP_API_TYPE,
    isFirebase: import.meta.env.VITE_APP_API_TYPE === 'firebase',
};
