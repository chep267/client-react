/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { LocaleObject } from '@module-base/constants/LocaleObject';

const messagesCache = {} as Record<App.ModuleBase.Store.Locale, App.ModuleBase.Store.LanguageMessages>;

export async function getMessage(locale: App.ModuleBase.Store.Locale): Promise<App.ModuleBase.Store.LanguageMessages> {
    if (messagesCache[locale]) {
        return Promise.resolve(messagesCache[locale]);
    }
    const messages = await import(`@lang/${locale}.ts`);
    if (messages && messages[locale]) {
        messagesCache[locale] = messages[locale];
        return Promise.resolve(messages[locale]);
    }
    return Promise.resolve(messagesCache[LocaleObject.en]);
}
