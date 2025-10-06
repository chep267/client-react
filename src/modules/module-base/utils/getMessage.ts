/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { LocaleObject } from '@module-base/constants/LocaleObject';

type TypeMessageModule = Record<App.ModuleBase.Store.Locale, App.ModuleBase.Store.LanguageMessages>;

const localeLoaders = import.meta.glob<TypeMessageModule>('/src/langs/*.ts', { eager: false });

const messagesCache = {} as TypeMessageModule;

const pendingPromises = {} as Record<
    App.ModuleBase.Store.Locale,
    Promise<App.ModuleBase.Store.LanguageMessages> | undefined
>;

export async function getMessage(locale: App.ModuleBase.Store.Locale): Promise<App.ModuleBase.Store.LanguageMessages> {
    if (messagesCache[locale]) {
        return messagesCache[locale];
    }
    if (pendingPromises[locale]) {
        return pendingPromises[locale];
    }

    const defaultLocale = LocaleObject.en;
    const loaderPath = `/src/langs/${locale}.ts`;
    const loader = localeLoaders[loaderPath];
    if (!loader) {
        console.warn(`Loader not found for locale: "${locale}". Falling back to "${defaultLocale}".`);
        return getMessage(defaultLocale);
    }

    pendingPromises[locale] = (async () => {
        try {
            const messages = await loader();
            if (messages?.[locale]) {
                messagesCache[locale] = messages[locale];
                return messages[locale];
            }
            return getMessage(defaultLocale);
        } catch (error) {
            console.error(`Failed to load locale ${locale} due to network or file error:`, error);
            return getMessage(defaultLocale);
        } finally {
            pendingPromises[locale] = undefined;
        }
    })();
    return pendingPromises[locale];
}
