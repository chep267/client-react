/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
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
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { SiderState } from '@module-base/constants/SiderState';
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** hooks */
import { useSider } from '@module-base/hooks/useSider';

const AppSiderMini = React.memo(function AppSiderMini() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const hookSider = useSider();
    const [activePath, setActivePath] = React.useState('');

    React.useEffect(() => {
        if (activePath) {
            navigate(activePath);
        }
    }, [activePath]);

    const apps = React.useMemo(() => {
        return [
            {
                path: GlobalRouterPath.feed,
                name: <FormattedMessage id={GlobalLanguage.component.label.feed} />,
                icon: <HomeIcon />,
            },
            {
                path: GlobalRouterPath.messenger,
                name: <FormattedMessage id={GlobalLanguage.component.label.messenger} />,
                icon: <TelegramIcon />,
            },
            {
                path: GlobalRouterPath.calendar,
                name: <FormattedMessage id={GlobalLanguage.component.label.calendar} />,
                icon: <CalendarMonthIcon />,
            },
            {
                path: GlobalRouterPath.game,
                name: <FormattedMessage id={GlobalLanguage.component.label.game} />,
                icon: <GamesIcon />,
            },
        ];
    }, []);

    const tabValue = React.useMemo(() => {
        const value = apps.find((item) => (activePath || pathname).startsWith(item.path));
        return value?.path || GlobalRouterPath.defaultPath;
    }, [pathname, activePath]);

    const handleChange = React.useCallback((_event: React.SyntheticEvent, path: string) => {
        setActivePath(path);
    }, []);

    return (
        <AppBar
            position="sticky"
            className={classnames('z-10', { ['hidden']: hookSider.data.siderState !== SiderState.hidden })}
            sx={{ top: `${ScreenSize.HeaderHeight}px` }}
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
