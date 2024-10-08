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
import { SiderState } from '@module-global/constants/SiderState';
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';
import { ScreenSize } from '@module-global/constants/ScreenSize';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** hooks */
import { useSider } from '@module-global/hooks/useSider';

const AppSiderMini = React.memo(function AppSiderMini() {
    const {
        data: { siderState },
    } = useSider();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const sxStyles = React.useRef({ top: ScreenSize.HeaderHeight }).current;

    const apps = React.useRef([
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
    ]).current;

    const tabValue = React.useMemo(() => {
        const value = apps.find((item) => pathname.startsWith(item.path));
        return value?.path || GlobalRouterPath.defaultPath;
    }, [pathname]);

    const handleChange = React.useCallback((event: React.SyntheticEvent, path: string) => {
        navigate(path);
    }, []);

    return (
        <AppBar position="sticky" className={classnames('z-10', { hidden: siderState !== SiderState.hidden })} sx={sxStyles}>
            <Tabs value={tabValue} onChange={handleChange} textColor="primary" indicatorColor="primary" variant="fullWidth">
                {apps.map((menu) => (
                    <Tab key={menu.path} id={menu.path} value={menu.path} label={menu.icon} />
                ))}
            </Tabs>
        </AppBar>
    );
});

export default AppSiderMini;
