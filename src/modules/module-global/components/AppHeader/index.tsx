/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';

/** components */
import AppInfo from '@module-global/components/AppHeader/AppInfo';
import AppTimer from '@module-global/components/AppHeader/AppTimer';
import AppButtonDev from '@module-global/components/AppHeader/AppButtonDev';
import ButtonSetting from '@module-global/components/AppHeader/ButtonSetting';

export default function AppHeader() {
    return (
        <AppBar position="fixed">
            <Toolbar
                className={clsx(
                    'flex flex-row items-center justify-between',
                    'w-full px-4 py-0',
                    'h-(--app-size-header-height) !min-h-0',
                    'text-tw-primary bg-white',
                    'dark:bg-transparent dark:text-white'
                )}
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
}
