/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { NotifyContext } from '@module-base/contexts/NotifyContext';

export const useNotify = () => React.useContext(NotifyContext);
