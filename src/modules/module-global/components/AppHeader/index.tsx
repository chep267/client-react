/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';

/** components */
import AppInfo from './AppInfo.tsx';
import AppTimer from './AppTimer.tsx';
import AppButtonDev from './AppButtonDev.tsx';
import ButtonSetting from './ButtonSetting/index.tsx';

const AppHeader = React.memo(function AppHeader() {
    return (
        <AppBar position="fixed">
            <Toolbar className="flex flex-row justify-between items-center w-full h-16 py-0 px-6">
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
