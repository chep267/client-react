/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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
import { localeObject } from '@module-language/constants/localeObject';

/** contexts */
import { LanguageContext } from '@module-language/contexts/LanguageContext';

/** utils */
import { getDeviceLanguage } from '@module-language/utils/getDeviceLanguage';
import { getMessage } from '@module-language/utils/getMessage';

/** types */
import type { TypeLocale, TypeMessages, LanguageProviderProps, LanguageContextProps } from '@module-language/types';

export default function LanguageProvider(props: LanguageProviderProps) {
    const { children } = props;

    const [locale, setLocale] = React.useState<TypeLocale>(() => {
        const localeCookie = Cookies.get(AppKey.locale) as TypeLocale;
        if (localeCookie && localeCookie in localeObject) {
            return localeCookie;
        }
        return getDeviceLanguage();
    });
    const [messages, setMessages] = React.useState<TypeMessages | null>(null);

    React.useEffect(() => {
        getMessage(locale).then(setMessages);
    }, [locale]);

    const setLanguage = React.useCallback<LanguageContextProps['method']['setLanguage']>((value) => {
        Cookies.set(AppKey.locale, value);
        setLocale(value);
    }, []);

    const store = React.useMemo<LanguageContextProps>(() => {
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
            <IntlProvider defaultLocale={localeObject.en} locale={locale} messages={messages}>
                {children}
            </IntlProvider>
        </LanguageContext.Provider>
    );
}
