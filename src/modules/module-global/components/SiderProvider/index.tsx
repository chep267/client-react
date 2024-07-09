/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { SiderState } from '@module-global/constants/SiderState.ts';

/** contexts */
import { defaultSiderState, getSiderState, SiderContext } from '@module-global/contexts/SiderContext.ts';

/** types */
import type { SiderProviderProps, TypeSiderContext } from '@module-global/models';

export default function SiderProvider(props: SiderProviderProps) {
    const { children } = props;

    const [siderState, setSiderState] = React.useState(defaultSiderState.siderState);

    React.useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const onResize = React.useCallback(() => {
        setSiderState(() => getSiderState());
    }, []);

    const onChangeState = React.useCallback(() => {
        setSiderState((prev) => (prev === SiderState.collapse ? SiderState.expand : SiderState.collapse));
    }, []);

    const store = React.useMemo<TypeSiderContext>(() => {
        return {
            data: {
                siderState,
            },
            method: {
                onChangeState: onChangeState,
            },
        };
    }, [siderState]);

    return <SiderContext.Provider value={store}>{children}</SiderContext.Provider>;
}
