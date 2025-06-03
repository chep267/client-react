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

/** hooks */
import { useSider } from '@module-base/hooks/useSider';

/** components */
import ListApp from './ListApp';

const AppSider = React.memo(function AppSider() {
    const hookSider = useSider();
    const {
        data: { siderState },
        method: { toggleSider },
    } = hookSider;

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
        siderState === AppSiderState.expand ? GlobalLanguage.component.label.collapse : GlobalLanguage.component.label.expand;

    return (
        <Drawer
            variant="permanent"
            open={siderState !== AppSiderState.hidden}
            className="relative h-full overflow-x-hidden transition-[width]"
            sx={siderStyles.drawer[siderState]}
            slotProps={{
                paper: {
                    className: 'left-0 transition-[width] z-1 overflow-x-hidden',
                    sx: siderStyles.paper[siderState],
                },
            }}
        >
            <Tooltip title={<FormattedMessage id={tooltipId} />} placement="right">
                <Button className="w-full min-w-14" disabled={siderState === AppSiderState.force} onClick={toggleSider}>
                    {siderState === AppSiderState.expand ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
                </Button>
            </Tooltip>
            <Divider />
            <ListApp hasTooltip={siderState === AppSiderState.collapse} />
        </Drawer>
    );
});

export default AppSider;
