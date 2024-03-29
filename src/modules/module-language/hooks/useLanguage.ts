/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** constants */
import { LanguageContext } from '@module-language/constants/LanguageContext.ts';

export const useLanguage = () => React.useContext(LanguageContext);
