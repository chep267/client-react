/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import TelegramIcon from '@mui/icons-material/Telegram';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GamesIcon from '@mui/icons-material/Games';

/** constants */
import { AppSiderState } from '@module-base/constants/AppSiderState';
import { AppRouterPath } from '@module-base/constants/AppRouterPath';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

const AppSiderMini = React.memo(function AppSiderMini() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const sider = useSettingStore((store) => store.data.sider);

    const apps = React.useMemo(() => {
        return [
            {
                path: AppRouterPath.feed,
                icon: <HomeIcon />,
            },
            {
                path: AppRouterPath.messenger,
                icon: <TelegramIcon />,
            },
            {
                path: AppRouterPath.calendar,
                icon: <CalendarMonthIcon />,
            },
            {
                path: AppRouterPath.game,
                icon: <GamesIcon />,
            },
        ];
    }, []);

    const tabValue = React.useMemo(() => {
        const value = apps.find((item) => pathname.startsWith(item.path));
        return value?.path || AppRouterPath.defaultPath;
    }, [pathname]);

    const handleChange = (_event: React.SyntheticEvent, path: string) => {
        navigate(path);
    };

    return (
        <AppBar
            position="sticky"
            className={clsx('top-0 z-1', {
                ['hidden']: sider !== AppSiderState.hidden,
            })}
        >
            <Tabs
                value={tabValue}
                onChange={handleChange}
                variant="fullWidth"
                className="[&_.MuiTabs-indicator]:bg-tw-primary"
            >
                {apps.map((menu) => (
                    <Tab
                        key={menu.path}
                        id={menu.path}
                        value={menu.path}
                        label={menu.icon}
                        className="aria-selected:text-tw-primary"
                    />
                ))}
            </Tabs>
        </AppBar>
    );
});

export default AppSiderMini;
