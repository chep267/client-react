/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { SiderContext } from '@module-global/contexts/SiderContext';

export const useSider = () => React.useContext(SiderContext);
