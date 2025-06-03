/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { PropsWithChildren } from 'react';
import type { TypeMessages } from './data.d';

export type TypeLanguageProviderProps = PropsWithChildren<{
    messages?: TypeMessages;
}>;
