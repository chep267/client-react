/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { NotifyContext } from '@module-base/contexts/NotifyContext.ts';

export const useNotify = () => React.useContext(NotifyContext);
