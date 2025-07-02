/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

export const getSiderState = (): App.ModuleBase.Store.SiderState => {
    switch (true) {
        case window.innerWidth < AppScreenSize.AppbarHiddenBreakpoint:
            return AppSiderState.hidden;
        case window.innerWidth < AppScreenSize.AppbarCollapseBreakpoint:
            return AppSiderState.force;
        default:
            return AppSiderState.expand;
    }
};
