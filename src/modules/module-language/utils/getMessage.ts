/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { LocaleObject } from '@module-language/constants/LocaleObject';

const messagesCache = {} as Record<App.ModuleLanguage.Data.Locale, App.ModuleLanguage.Data.Messages>;

export async function getMessage(locale: App.ModuleLanguage.Data.Locale): Promise<App.ModuleLanguage.Data.Messages> {
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
