/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { ThemeObject } from '@module-base/constants/ThemeObject';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import AppInfo from '@module-global/components/AppHeader/AppInfo';
import AppTimer from '@module-global/components/AppHeader/AppTimer';
import AppButtonDev from '@module-global/components/AppHeader/AppButtonDev';
import ButtonSetting from '@module-global/components/AppHeader/ButtonSetting';

const AppHeader = React.memo(function AppHeader() {
    const appbarStyle = React.useRef({ height: AppScreenSize.HeaderHeight });
    const theme = useSettingStore((store) => store.data.theme);

    return (
        <AppBar position="fixed">
            <Toolbar
                className={clsx(
                    'flex w-full flex-row items-center justify-between px-4 py-0',
                    'text-tw-primary',
                    'dark:text-white',
                    { ['bg-white']: theme === ThemeObject.light }
                )}
                sx={appbarStyle.current}
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
