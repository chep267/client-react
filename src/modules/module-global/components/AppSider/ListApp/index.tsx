/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import HomeIcon from '@mui/icons-material/Home';
import TelegramIcon from '@mui/icons-material/Telegram';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GamesIcon from '@mui/icons-material/Games';

/** constants */
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';

/** components */
import ListBase from '@module-base/components/ListBase';
import AppItem from './AppItem';

/** types */
import type { ListAppProps, TypeAppItem } from '@module-global/types';

const ListApp = React.memo(function ListApp(props: ListAppProps) {
    const { isTooltip } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const MENU_ROUTER = React.useRef<TypeAppItem[]>([
        {
            path: ScreenPath.feed,
            name: <FormattedMessage id="module.global.sider.app.feed.tooltip" />,
            icon: <HomeIcon />,
            onClick: () => navigate(ScreenPath.feed),
        },
        {
            path: ScreenPath.messenger,
            name: <FormattedMessage id="module.global.sider.app.messenger.tooltip" />,
            icon: <TelegramIcon />,
            onClick: () => navigate(ScreenPath.messenger),
        },
        {
            path: ScreenPath.calendar,
            name: <FormattedMessage id="module.global.sider.app.calendar.tooltip" />,
            icon: <CalendarMonthIcon />,
            onClick: () => navigate(ScreenPath.calendar),
        },
        {
            path: ScreenPath.game,
            name: <FormattedMessage id="module.global.sider.app.game.tooltip" />,
            icon: <GamesIcon />,
            onClick: () => navigate(ScreenPath.game),
        },
    ]).current;

    const router = `/${pathname.split('/')[1]}`;

    const renderItem = (item: TypeAppItem) => {
        return <AppItem key={item.path} isSelected={item.path === router} isTooltip={isTooltip} item={item} />;
    };

    return <ListBase data={MENU_ROUTER} renderItem={renderItem} />;
});

export default ListApp;
