/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { LanguageContext } from '@module-language/contexts/LanguageContext';

export const useLanguage = () => React.useContext(LanguageContext);
