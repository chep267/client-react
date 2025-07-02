/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import ListApp from './ListApp';

const AppSider = React.memo(function AppSider() {
    const sider = useSettingStore((store) => store.data.sider);
    const settingAction = useSettingStore((store) => store.action);

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

    const tooltipId =
        sider === AppSiderState.expand ? GlobalLanguage.component.label.collapse : GlobalLanguage.component.label.expand;

    const onChangeSider = () => {
        settingAction.changeSider(sider === AppSiderState.expand ? AppSiderState.collapse : AppSiderState.expand);
    };

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
            <Tooltip title={<FormattedMessage id={tooltipId} />} placement="right">
                <Button className="w-full min-w-14" disabled={sider === AppSiderState.force} onClick={onChangeSider}>
                    {sider === AppSiderState.expand ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
                </Button>
            </Tooltip>
            <Divider />
            <ListApp hasTooltip={sider === AppSiderState.collapse} />
        </Drawer>
    );
});

export default AppSider;
