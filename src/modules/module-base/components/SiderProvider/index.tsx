/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { SiderState } from '@module-base/constants/SiderState';

/** contexts */
import { defaultSiderState, SiderContext } from '@module-base/contexts/SiderContext';

/** types */
import type { SiderProviderProps, TypeSiderContext } from '@module-base/types';

export default function SiderProvider(props: SiderProviderProps) {
    const { children } = props;

    const isCollapse = useMediaQuery(`(max-width:${ScreenSize.AppbarCollapseBreakpoint}px)`);
    const isHidden = useMediaQuery(`(max-width:${ScreenSize.AppbarHiddenBreakpoint}px)`);

    const lastState = React.useRef(
        defaultSiderState.siderState !== SiderState.expand ? SiderState.collapse : SiderState.expand
    );
    const [siderState, setSiderState] = React.useState(defaultSiderState.siderState);

    React.useEffect(() => {
        setSiderState(() => {
            switch (true) {
                case isHidden:
                    return SiderState.hidden;
                case isCollapse:
                    return SiderState.force;
                default:
                    return lastState.current;
            }
        });
    }, [isCollapse, isHidden]);

    const toggleSider = React.useCallback(() => {
        setSiderState((prevState) => {
            lastState.current = prevState === SiderState.expand ? SiderState.collapse : SiderState.expand;
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
