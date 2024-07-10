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
import { SiderState } from '@module-global/constants/SiderState.ts';
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';

/** hooks */
import { useSider } from '@module-global/hooks/useSider.ts';

const AppSiderMini = React.memo(function AppSiderMini() {
    const {
        data: { siderState },
    } = useSider();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const sxStyles = React.useRef({ top: ScreenSize.HeaderHeight }).current;

    const MENU_ROUTER = React.useRef([
        {
            path: ScreenPath.feed,
            name: <FormattedMessage id="module.global.sider.app.feed.tooltip" />,
            icon: <HomeIcon />,
        },
        {
            path: ScreenPath.messenger,
            name: <FormattedMessage id="module.global.sider.app.messenger.tooltip" />,
            icon: <TelegramIcon />,
        },
        {
            path: ScreenPath.calendar,
            name: <FormattedMessage id="module.global.sider.app.calendar.tooltip" />,
            icon: <CalendarMonthIcon />,
        },
        {
            path: ScreenPath.game,
            name: <FormattedMessage id="module.global.sider.app.game.tooltip" />,
            icon: <GamesIcon />,
        },
    ]).current;

    const tabValue = React.useMemo(() => {
        const value = MENU_ROUTER.find((item) => pathname.startsWith(item.path));
        return value?.path || ScreenPath.defaultPath;
    }, [pathname]);

    const handleChange = React.useCallback((event: React.SyntheticEvent, path: string) => {
        navigate(path);
    }, []);

    return (
        <AppBar position="sticky" className={classnames('z-10', { hidden: siderState !== SiderState.hidden })} sx={sxStyles}>
            <Tabs value={tabValue} onChange={handleChange} textColor="primary" indicatorColor="primary" variant="fullWidth">
                {MENU_ROUTER.map((menu) => (
                    <Tab key={menu.path} id={menu.path} value={menu.path} label={menu.icon} />
                ))}
            </Tabs>
        </AppBar>
    );
});

export default AppSiderMini;
