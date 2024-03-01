/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** constants */
import { defaultNotifyState, AppDefaultValue } from '@module-base/constants';

/** types */
import type { TypeNotifyContext } from '@module-base/models';

export const NotifyContext = React.createContext<TypeNotifyContext>({
    data: defaultNotifyState,
    method: {
        toggleNotify: AppDefaultValue.emptyFunction,
    },
});
