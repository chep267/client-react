/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';
import { localeObject } from './localeObject.ts';

/** types */
import type { LanguageContextProps } from '@module-language/models';

export const LanguageContext = React.createContext<LanguageContextProps>({
    data: {
        locale: localeObject.vi,
    },
    method: {
        setLanguage: AppDefaultValue.emptyFunction,
    },
});
