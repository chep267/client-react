/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { themeObject } from '@module-theme/constants/themeObject';

/** types */
import type { ThemeContextProps } from '@module-theme/types';

export const ThemeContext = React.createContext<ThemeContextProps>({
    data: {
        mode: themeObject.light,
    },
    method: {
        setTheme: AppDefaultValue.emptyFunction,
    },
});
