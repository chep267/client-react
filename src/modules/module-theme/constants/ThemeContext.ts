/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';
import { themeObject } from '@module-theme/constants/themeObject.ts';

/** types */
import type { ThemeContextProps } from '@module-theme/models';

export const ThemeContext = React.createContext<ThemeContextProps>({
    data: {
        mode: themeObject.light,
    },
    method: {
        setTheme: AppDefaultValue.emptyFunction,
    },
});
