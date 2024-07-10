/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';
import { SiderState } from '@module-global/constants/SiderState.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** types */
import type { TypeSiderContext, TypeSiderState } from '@module-global/models';

export const getSiderState = (): TypeSiderState => {
    switch (true) {
        case window.innerWidth < ScreenSize.AppbarHiddenBreakpoint:
            return SiderState.hidden;
        case window.innerWidth < ScreenSize.AppbarCollapseBreakpoint:
            return SiderState.force;
        default:
            return SiderState.expand;
    }
};

export const defaultSiderState = Object.freeze<TypeSiderContext['data']>({
    siderState: getSiderState(),
});

export const SiderContext = React.createContext<TypeSiderContext>({
    data: defaultSiderState,
    method: {
        toggleSider: AppDefaultValue.emptyFunction,
    },
});
