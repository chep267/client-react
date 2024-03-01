/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** lib components */
import { AppBar, Toolbar, Box } from '@mui/material';

/** icons */
import { Notifications as NotificationsIcon, Message as MessageIcon } from '@mui/icons-material';

/** components */
import AppInfo from './AppInfo.tsx';
import AppTimer from './AppTimer.tsx';
import AppButtonDev from './AppButtonDev.tsx';
import AppButtonMenu from './AppButtonMenu.tsx';

const AppHeader = React.memo(function AppHeader() {
    return (
        <AppBar position="fixed">
            <Toolbar className="flex flex-row justify-between items-center w-full h-16 py-0 px-6">
                <Box className="flex items-center gap-5">
                    <AppInfo />
                    <AppTimer />
                </Box>
                <Box className="flex items-center gap-2">
                    <AppButtonDev tooltip="Messenger" icon={<MessageIcon />} />
                    <AppButtonDev tooltip="Messenger" icon={<NotificationsIcon />} />
                    <AppButtonMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default AppHeader;
