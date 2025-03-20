/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { PropsWithChildren } from 'react';
import type { TypeLocale, TypeMessages } from './data.d';

export declare type LanguageContextProps = {
    data: {
        locale: TypeLocale;
    };
    method: {
        setLanguage(value: TypeLocale): void;
    };
};

export declare type LanguageProviderProps = PropsWithChildren<{
    messages?: TypeMessages;
}>;
