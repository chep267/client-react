/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
import { AppKey } from '@module-base/constants/AppKey';
import { ThemeObject } from '@module-base/constants/ThemeObject';

export const getDeviceTheme = (): App.ModuleBase.Store.Theme => {
    // get from cookie
    let theme = Cookies.get(AppKey.theme) as App.ModuleBase.Store.Theme;
    if (theme in ThemeObject) {
        return theme;
    }
    // get from env
    theme = AppEnv.appTheme;
    if (theme in ThemeObject) {
        return theme;
    }
    // get from device
    if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
        return ThemeObject.dark;
    }
    return ThemeObject.light;
};
