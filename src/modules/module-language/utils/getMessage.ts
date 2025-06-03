/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { localeObject } from '@module-language/constants/localeObject';

/** types */
import type { TypeLocale, TypeMessages } from '@module-language/types';

const messagesCache = {} as Record<TypeLocale, TypeMessages>;

export async function getMessage(locale: TypeLocale): Promise<TypeMessages> {
    if (messagesCache[locale]) {
        return Promise.resolve(messagesCache[locale]);
    }
    const messages = await import(`@lang/${locale}.ts`);
    if (messages && messages[locale]) {
        messagesCache[locale] = messages[locale];
        return Promise.resolve(messages[locale]);
    }
    return Promise.resolve(messagesCache[localeObject.en]);
}
