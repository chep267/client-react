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
import { LocaleObject } from '@module-language/constants/LocaleObject';

export const getDeviceLanguage = (): App.ModuleLanguage.Data.Locale => {
    // get from cookie
    let locale = Cookies.get(AppKey.locale) as App.ModuleLanguage.Data.Locale;
    if (locale in LocaleObject) {
        return locale;
    }
    // get from env
    locale = AppEnv.appLocale;
    if (locale in LocaleObject) {
        return locale;
    }
    // get from device
    const deviceLanguage = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    // vi_VN | en_UK | en_US | ...
    locale = `${deviceLanguage}`.slice(0, 2) as App.ModuleLanguage.Data.Locale;
    if (locale in LocaleObject) {
        return locale;
    }
    // default
    return LocaleObject.en;
};
