/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { LocaleObject } from '@module-language/constants/LocaleObject';

export const LanguageContext = React.createContext<App.ModuleLanguage.Hook.LanguageContext>({
    data: {
        locale: LocaleObject.vi,
    },
    method: {
        setLanguage: AppDefaultValue.emptyFunction,
    },
});
