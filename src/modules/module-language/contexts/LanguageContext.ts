/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { localeObject } from '@module-language/constants/localeObject';

export const LanguageContext = React.createContext<App.ModuleLanguage.Hook.LanguageContext>({
    data: {
        locale: localeObject.vi,
    },
    method: {
        setLanguage: AppDefaultValue.emptyFunction,
    },
});
