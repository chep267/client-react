/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

export const defaultNotifyState: Readonly<App.ModuleBase.Hook.Notify> = {
    open: false,
    message: '',
    messageIntl: '',
    color: undefined,
    duration: undefined,
};

export const NotifyContext = React.createContext<App.ModuleBase.Hook.NotifyContext>({
    data: defaultNotifyState,
    method: {
        toggleNotify: AppDefaultValue.emptyFunction,
        closeNotify: AppDefaultValue.emptyFunction,
    },
});
