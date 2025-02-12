/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { SiderState } from '@module-base/constants/SiderState';
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

    const siderStyles = React.useRef({
        [SiderState.hidden]: { width: 0, display: 'none' },
        [SiderState.expand]: { width: ScreenSize.AppBarExpandWidth },
        [SiderState.collapse]: { width: ScreenSize.AppBarCollapseWidth },
        [SiderState.force]: { width: ScreenSize.AppBarCollapseWidth },
    }).current;

    return (
        <Drawer
            variant="permanent"
            open={siderState !== SiderState.hidden}
            className="!relative !h-full transition-[width] duration-500"
            sx={siderStyles[siderState]}
            PaperProps={{
                className: '!top-16 !left-0 transition-[width] duration-500 !z-10',
                sx: siderStyles[siderState],
            }}
        >
            <Tooltip
                title={
                    <FormattedMessage
                        id={
                            GlobalLanguage.component.label[
                                siderState === SiderState.expand ? SiderState.collapse : SiderState.expand
                            ]
                        }
                    />
                }
                placement="right"
            >
                <div className="w-full">
                    <Button className="w-full !min-w-14" disabled={siderState === SiderState.force} onClick={toggleSider}>
                        {siderState === SiderState.expand ? (
                            <KeyboardDoubleArrowLeftIcon />
                        ) : (
                            <KeyboardDoubleArrowRightIcon />
                        )}
                    </Button>
                </div>
            </Tooltip>
            <Divider />
            <ListApp hasTooltip={siderState === SiderState.collapse} />
        </Drawer>
    );
});

export default AppSider;
