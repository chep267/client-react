/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeLocale } from './data.d';

export type TypeLanguageContext = {
    data: {
        locale: TypeLocale;
    };
    method: {
        setLanguage(value: TypeLocale): void;
    };
};
