/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Cookies from 'js-cookie';
import { IntlProvider } from 'react-intl';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { LocaleObject } from '@module-language/constants/LocaleObject';

/** contexts */
import { LanguageContext } from '@module-language/contexts/LanguageContext';

/** utils */
import { getDeviceLanguage } from '@module-language/utils/getDeviceLanguage';
import { getMessage } from '@module-language/utils/getMessage';

export default function LanguageProvider(props: App.ModuleLanguage.Component.LanguageProviderProps) {
    const { children } = props;

    const [locale, setLocale] = React.useState<App.ModuleLanguage.Data.Locale>(() => {
        const localeCookie = Cookies.get(AppKey.locale) as App.ModuleLanguage.Data.Locale;
        if (localeCookie && localeCookie in LocaleObject) {
            return localeCookie;
        }
        return getDeviceLanguage();
    });
    const [messages, setMessages] = React.useState<App.ModuleLanguage.Data.Messages | null>(null);

    React.useEffect(() => {
        getMessage(locale).then(setMessages);
    }, [locale]);

    const setLanguage = React.useCallback<App.ModuleLanguage.Hook.LanguageContext['method']['setLanguage']>((value) => {
        Cookies.set(AppKey.locale, value);
        setLocale(value);
    }, []);

    const store = React.useMemo<App.ModuleLanguage.Hook.LanguageContext>(() => {
        return {
            data: { locale },
            method: { setLanguage },
        };
    }, [locale]);

    if (!messages) {
        return null;
    }
    return (
        <LanguageContext.Provider value={store}>
            <IntlProvider defaultLocale={LocaleObject.en} locale={locale} messages={messages}>
                {children}
            </IntlProvider>
        </LanguageContext.Provider>
    );
}
