/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { ThemeContext } from '@module-theme/contexts/ThemeContext.ts';

export const useTheme = () => React.useContext(ThemeContext);
