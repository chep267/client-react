/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

export const getSiderState = (): App.ModuleBase.Hook.SiderState => {
    switch (true) {
        case window.innerWidth < AppScreenSize.AppbarHiddenBreakpoint:
            return AppSiderState.hidden;
        case window.innerWidth < AppScreenSize.AppbarCollapseBreakpoint:
            return AppSiderState.force;
        default:
            return AppSiderState.expand;
    }
};

export const defaultSiderState: Readonly<App.ModuleBase.Hook.SiderContext['data']> = {
    siderState: getSiderState(),
};

export const SiderContext = React.createContext<App.ModuleBase.Hook.SiderContext>({
    data: defaultSiderState,
    method: {
        toggleSider: AppDefaultValue.emptyFunction,
    },
});
