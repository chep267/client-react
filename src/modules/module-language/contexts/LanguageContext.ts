/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { localeObject } from '@module-language/constants/localeObject';

/** types */
import type { LanguageContextProps } from '@module-language/types';

export const LanguageContext = React.createContext<LanguageContextProps>({
    data: {
        locale: localeObject.vi,
    },
    method: {
        setLanguage: AppDefaultValue.emptyFunction,
    },
});
