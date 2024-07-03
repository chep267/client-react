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

/** hooks */
import { useSider } from '@module-global/hooks/useSider.ts';

/** components */
import ListApp from './ListApp';

const AppSider = React.memo(function AppSider() {
    const {
        data: { openSider, isPointMD },
        method: { setOpenSider },
    } = useSider();

    return (
        <Drawer
            variant="permanent"
            open={openSider}
            className={classnames(
                'relative max-[567px]:hidden transition-[width] duration-500 h-full',
                { ['w-app-bar-expand']: openSider },
                { ['w-app-bar-collapse']: !openSider }
            )}
            PaperProps={{
                className: classnames(
                    'top-16 left-0 transition-[width] duration-500 z-10',
                    { ['w-app-bar-expand']: openSider },
                    { ['w-app-bar-collapse']: !openSider }
                ),
            }}>
            <Tooltip
                title={<FormattedMessage id={`module.global.sider.button.${openSider ? 'collapse' : 'expand'}.tooltip`} />}
                placement="right">
                <Button size="large" disabled={isPointMD} onClick={() => setOpenSider((prev) => !prev)}>
                    {openSider ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
                </Button>
            </Tooltip>
            <Divider />
            <ListApp isTooltip={!openSider} />
        </Drawer>
    );
});

export default AppSider;
