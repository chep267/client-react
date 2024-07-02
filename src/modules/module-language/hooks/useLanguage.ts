/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { LanguageContext } from '@module-language/contexts/LanguageContext.ts';

export const useLanguage = () => React.useContext(LanguageContext);
