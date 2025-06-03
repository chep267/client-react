/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { LanguageContext } from '@module-language/contexts/LanguageContext';

export const useLanguage = () => React.useContext(LanguageContext);
