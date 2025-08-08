/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import ButtonSider from '@module-global/components/AppSider/ButtonSider';
import ListApp from '@module-global/components/AppSider/ListApp';

const AppSider = React.memo(function AppSider() {
    const sider = useSettingStore((store) => store.data.sider);

    const siderStyles = React.useMemo(
        () => ({
            drawer: {
                [AppSiderState.hidden]: { width: 0, display: 'none' },
                [AppSiderState.expand]: { width: AppScreenSize.AppBarExpandWidth },
                [AppSiderState.collapse]: { width: AppScreenSize.AppBarCollapseWidth },
                [AppSiderState.force]: { width: AppScreenSize.AppBarCollapseWidth },
            },
            paper: {
                [AppSiderState.hidden]: { width: 0, display: 'none' },
                [AppSiderState.expand]: {
                    width: AppScreenSize.AppBarExpandWidth,
                    height: `calc(100% - ${AppScreenSize.HeaderHeight}px)`,
                    top: `${AppScreenSize.HeaderHeight}px !important`,
                },
                [AppSiderState.collapse]: {
                    width: AppScreenSize.AppBarCollapseWidth,
                    height: `calc(100% - ${AppScreenSize.HeaderHeight}px)`,
                    top: `${AppScreenSize.HeaderHeight}px !important`,
                },
                [AppSiderState.force]: {
                    width: AppScreenSize.AppBarCollapseWidth,
                    height: `calc(100% - ${AppScreenSize.HeaderHeight}px)`,
                    top: `${AppScreenSize.HeaderHeight}px !important`,
                },
            },
        }),
        []
    );

    return (
        <Drawer
            variant="permanent"
            open={sider !== AppSiderState.hidden}
            className="relative h-full overflow-x-hidden transition-[width]"
            sx={siderStyles.drawer[sider]}
            slotProps={{
                paper: {
                    className: 'left-0 transition-[width] z-1 overflow-x-hidden',
                    sx: siderStyles.paper[sider],
                },
            }}
        >
            <ButtonSider />
            <Divider />
            <ListApp hasTooltip={sider !== AppSiderState.expand} />
        </Drawer>
    );
});

export default AppSider;
