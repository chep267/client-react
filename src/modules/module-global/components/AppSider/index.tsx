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
import { ScreenSize } from '@module-global/constants/ScreenSize';
import { SiderState } from '@module-global/constants/SiderState';

/** hooks */
import { useSider } from '@module-global/hooks/useSider';

/** components */
import ListApp from './ListApp';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

const AppSider = React.memo(function AppSider() {
    const {
        data: { siderState },
        method: { toggleSider },
    } = useSider();

    const sxStyles = React.useRef({
        [SiderState.hidden]: { width: 0, display: 'none' },
        [SiderState.expand]: { width: ScreenSize.AppBarExpandWidth },
        [SiderState.collapse]: { width: ScreenSize.AppBarCollapseWidth },
        [SiderState.force]: { width: ScreenSize.AppBarCollapseWidth },
    }).current;

    return (
        <Drawer
            variant="permanent"
            open={siderState !== SiderState.hidden}
            className="relative transition-[width] duration-500 h-full"
            sx={sxStyles[siderState]}
            PaperProps={{
                className: 'top-16 left-0 transition-[width] duration-500 z-10',
                sx: sxStyles[siderState],
            }}>
            <Tooltip
                title={
                    <FormattedMessage id={GlobalLanguage.component.label[siderState === 'expand' ? 'collapse' : 'expand']} />
                }
                placement="right">
                <div className={'w-full'}>
                    <Button className={'min-w-14 w-full'} disabled={siderState === SiderState.force} onClick={toggleSider}>
                        {siderState === SiderState.expand ? (
                            <KeyboardDoubleArrowLeftIcon />
                        ) : (
                            <KeyboardDoubleArrowRightIcon />
                        )}
                    </Button>
                </div>
            </Tooltip>
            <Divider />
            <ListApp isTooltip={siderState !== SiderState.hidden} />
        </Drawer>
    );
});

export default AppSider;
