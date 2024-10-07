/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** types */
import type { TypeNotify, TypeNotifyContext } from '@module-base/types';

export const defaultNotifyState: Readonly<TypeNotify> = {
    open: false,
    message: '',
    mode: undefined,
    close: false,
    duration: undefined,
};

export const NotifyContext = React.createContext<TypeNotifyContext>({
    data: defaultNotifyState,
    method: {
        toggleNotify: AppDefaultValue.emptyFunction,
    },
});
