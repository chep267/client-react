/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import TelegramIcon from '@mui/icons-material/Telegram';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GamesIcon from '@mui/icons-material/Games';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** hooks */
import { useSider } from '@module-base/hooks/useSider';

const AppSiderMini = React.memo(function AppSiderMini() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const hookSider = useSider();

    const apps = React.useMemo(() => {
        return [
            {
                path: AppRouterPath.feed,
                name: <FormattedMessage id={GlobalLanguage.component.label.feed} />,
                icon: <HomeIcon />,
            },
            {
                path: AppRouterPath.messenger,
                name: <FormattedMessage id={GlobalLanguage.component.label.messenger} />,
                icon: <TelegramIcon />,
            },
            {
                path: AppRouterPath.calendar,
                name: <FormattedMessage id={GlobalLanguage.component.label.calendar} />,
                icon: <CalendarMonthIcon />,
            },
            {
                path: AppRouterPath.game,
                name: <FormattedMessage id={GlobalLanguage.component.label.game} />,
                icon: <GamesIcon />,
            },
        ];
    }, []);

    const tabValue = React.useMemo(() => {
        const value = apps.find((item) => pathname.startsWith(item.path));
        return value?.path || AppRouterPath.defaultPath;
    }, [pathname]);

    const handleChange = React.useCallback((_event: React.SyntheticEvent, path: string) => {
        navigate(path);
    }, []);

    return (
        <AppBar
            position="sticky"
            className={clsx('z-1', { ['hidden']: hookSider.data.siderState !== AppSiderState.hidden })}
            sx={{ top: `${AppScreenSize.HeaderHeight}px` }}
        >
            <Tabs value={tabValue} onChange={handleChange} textColor="primary" indicatorColor="primary" variant="fullWidth">
                {apps.map((menu) => (
                    <Tab key={menu.path} id={menu.path} value={menu.path} label={menu.icon} />
                ))}
            </Tabs>
        </AppBar>
    );
});

export default AppSiderMini;
