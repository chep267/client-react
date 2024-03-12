/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';

/** types */
import type { TypeSiderContext } from '@module-global/models';

export const SiderContext = React.createContext<TypeSiderContext>({
    data: {
        openSider: true,
        isPointMD: false,
    },
    method: {
        setOpenSider: AppDefaultValue.emptyFunction,
    },
});
