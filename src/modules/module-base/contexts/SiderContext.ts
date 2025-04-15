/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

/** types */
import type { TypeSiderContext, TypeSiderState } from '@module-base/types';

export const getSiderState = (): TypeSiderState => {
    switch (true) {
        case window.innerWidth < AppScreenSize.AppbarHiddenBreakpoint:
            return AppSiderState.hidden;
        case window.innerWidth < AppScreenSize.AppbarCollapseBreakpoint:
            return AppSiderState.force;
        default:
            return AppSiderState.expand;
    }
};

export const defaultSiderState: Readonly<TypeSiderContext['data']> = {
    siderState: getSiderState(),
};

export const SiderContext = React.createContext<TypeSiderContext>({
    data: defaultSiderState,
    method: {
        toggleSider: AppDefaultValue.emptyFunction,
    },
});
