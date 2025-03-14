/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { localeObject } from '@module-language/constants/localeObject';

/** types */
import type { TypeLocale, TypeMessages } from '@module-language/types';

const messagesCache = {} as Record<TypeLocale, TypeMessages>;

async function loadMessages(locale: TypeLocale): Promise<TypeMessages> {
    let module: Record<'vi', TypeMessages> | Record<'en', TypeMessages>, messages: TypeMessages;
    switch (locale) {
        case localeObject.vi:
            module = await import(/* @vite-ignore */ '@lang/vi.ts');
            messages = module.vi;
            break;
        case localeObject.en:
        default:
            module = await import(/* @vite-ignore */ '@lang/en.ts');
            messages = module.en;
            break;
    }
    messagesCache[locale] = messages;
    return messages;
}

export async function getMessage(locale: TypeLocale): Promise<TypeMessages> {
    if (messagesCache[locale]) {
        return Promise.resolve(messagesCache[locale]);
    }
    return await loadMessages(locale);
}
