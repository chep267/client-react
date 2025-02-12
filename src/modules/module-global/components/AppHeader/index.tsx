/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** components */
import AppInfo from './AppInfo';
import AppTimer from './AppTimer';
import AppButtonDev from './AppButtonDev';
import ButtonSetting from './ButtonSetting/index';

const AppHeader = React.memo(function AppHeader() {
    const appbarStyle = React.useRef({ height: ScreenSize.HeaderHeight }).current;

    return (
        <AppBar position="fixed">
            <Toolbar
                className={classnames('flex w-full flex-row items-center justify-between px-6 py-0', 'dark:text-white')}
                sx={appbarStyle}
            >
                <Box className="flex items-center gap-5">
                    <AppInfo />
                    <AppTimer />
                </Box>
                <Box className="flex items-center gap-2">
                    <AppButtonDev icon={<NotificationsIcon />} />
                    <ButtonSetting />
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default AppHeader;
