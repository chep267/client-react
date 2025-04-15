/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

/** contexts */
import { defaultSiderState, SiderContext } from '@module-base/contexts/SiderContext';

/** types */
import type { SiderProviderProps, TypeSiderContext } from '@module-base/types';

export default function SiderProvider(props: SiderProviderProps) {
    const { children } = props;

    const isCollapse = useMediaQuery(`(max-width:${AppScreenSize.AppbarCollapseBreakpoint}px)`);
    const isHidden = useMediaQuery(`(max-width:${AppScreenSize.AppbarHiddenBreakpoint}px)`);

    const lastState = React.useRef(
        defaultSiderState.siderState !== AppSiderState.expand ? AppSiderState.collapse : AppSiderState.expand
    );
    const [siderState, setSiderState] = React.useState(defaultSiderState.siderState);

    React.useEffect(() => {
        setSiderState(() => {
            switch (true) {
                case isHidden:
                    return AppSiderState.hidden;
                case isCollapse:
                    return AppSiderState.force;
                default:
                    return lastState.current;
            }
        });
    }, [isCollapse, isHidden]);

    const toggleSider = React.useCallback(() => {
        setSiderState((prevState) => {
            lastState.current = prevState === AppSiderState.expand ? AppSiderState.collapse : AppSiderState.expand;
            return lastState.current;
        });
    }, []);

    const store = React.useMemo<TypeSiderContext>(() => {
        return {
            data: {
                siderState,
            },
            method: {
                toggleSider,
            },
        };
    }, [siderState]);

    return <SiderContext.Provider value={store}>{children}</SiderContext.Provider>;
}
