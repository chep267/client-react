/**
 *
 * @author dongntd267@gmail.com
 *
 */

import * as React from 'react';

/** constants */
import { ThreadSearchContext } from '@module-messenger/constants';

export const useUiThreadSearch = () => React.useContext(ThreadSearchContext);
