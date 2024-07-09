/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** hooks */
import { useSider } from '@module-global/hooks/useSider.ts';

/** components */
import ListApp from './ListApp';
import { SiderState } from '@module-global/constants/SiderState.ts';

const AppSider = React.memo(function AppSider() {
    const {
        data: { siderState },
    } = useSider();

    const sxStyles = React.useRef({
        [SiderState.expand]: { width: ScreenSize.AppBarExpandWidth },
        [SiderState.collapse]: { width: ScreenSize.AppBarCollapseWidth },
    }).current;

    const [open, setOpen] = React.useState(siderState == SiderState.expand);

    const onChangeOpen = React.useCallback(() => setOpen((prevState) => !prevState), []);

    return (
        <Drawer
            variant="permanent"
            open={open}
            className={classnames('relative max-sm:hidden transition-[width] duration-500 h-full', {
                hidden: siderState === SiderState.hidden,
            })}
            sx={sxStyles[open ? siderState : SiderState.collapse]}
            PaperProps={{
                className: classnames('top-16 left-0 transition-[width] duration-500 z-10'),
                sx: sxStyles[open ? siderState : SiderState.collapse],
            }}>
            <Tooltip title={<FormattedMessage id={`module.global.sider.button.${siderState}.tooltip`} />} placement="right">
                <Button className={'min-w-14'} disabled={siderState !== SiderState.expand} onClick={onChangeOpen}>
                    {!open || siderState === SiderState.collapse ? (
                        <KeyboardDoubleArrowRightIcon />
                    ) : (
                        <KeyboardDoubleArrowLeftIcon />
                    )}
                </Button>
            </Tooltip>
            <Divider />
            <ListApp isTooltip={siderState !== SiderState.hidden} />
        </Drawer>
    );
});

export default AppSider;
