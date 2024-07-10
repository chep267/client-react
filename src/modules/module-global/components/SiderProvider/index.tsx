/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

/** constants */
import { SiderState } from '@module-global/constants/SiderState.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** contexts */
import { defaultSiderState, SiderContext } from '@module-global/contexts/SiderContext.ts';

/** types */
import type { SiderProviderProps, TypeSiderContext } from '@module-global/models';

export default function SiderProvider(props: SiderProviderProps) {
    const { children } = props;

    const isCollapse = useMediaQuery(`(max-width:${ScreenSize.AppbarCollapseBreakpoint}px)`);
    const isHidden = useMediaQuery(`(max-width:${ScreenSize.AppbarHiddenBreakpoint}px)`);

    const lastState = React.useRef(
        defaultSiderState.siderState === SiderState.hidden ? SiderState.collapse : defaultSiderState.siderState
    );
    const [siderState, setSiderState] = React.useState(defaultSiderState.siderState);

    React.useEffect(() => {
        setSiderState(() => {
            return isHidden ? SiderState.hidden : isCollapse ? SiderState.force : lastState.current;
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
