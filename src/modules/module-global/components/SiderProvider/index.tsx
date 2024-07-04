/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

/** contexts */
import { SiderContext } from '@module-global/contexts/SiderContext.ts';

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
