/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

/** constants */
import { LocaleObject } from '@module-base/constants/LocaleObject';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** utils */
import { getMessage } from '@module-base/utils/getMessage';

export default function LanguageProvider(props: React.PropsWithChildren) {
    const { children } = props;

    const locale = useSettingStore((store) => store.data.locale);
    const [messages, setMessages] = React.useState<App.ModuleBase.Store.LanguageMessages | null>(null);

    React.useEffect(() => {
        getMessage(locale).then(setMessages);
    }, [locale]);

    if (!messages) {
        return null;
    }

    return (
        <IntlProvider defaultLocale={LocaleObject.en} locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
}
