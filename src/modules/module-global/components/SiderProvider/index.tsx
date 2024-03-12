/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

/** utils */
import { SiderContext } from '@module-global/constants/SiderContext.ts';

/** types */
import type { SiderProviderProps, TypeSiderContext } from '@module-global/models';

export default function SiderProvider(props: SiderProviderProps) {
    const { children } = props;

    const isPointMD = useMediaQuery('(max-width:768px)'); // tailwind md
    const [openSider, setOpenSider] = React.useState(true);

    const store = React.useMemo<TypeSiderContext>(
        () => ({
            data: {
                openSider: openSider && !isPointMD,
                isPointMD,
            },
            method: {
                setOpenSider,
            },
        }),
        [openSider, isPointMD]
    );

    return <SiderContext.Provider value={store}>{children}</SiderContext.Provider>;
}
