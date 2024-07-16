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
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath.ts';

/** components */
import ListBase from '@module-base/components/ListBase';
import AppItem from './AppItem';

/** types */
import type { ListAppProps, TypeAppItem } from '@module-global/types';

const ListApp = React.memo(function ListApp(props: ListAppProps) {
    const { isTooltip } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const apps = React.useRef<TypeAppItem[]>([
        {
            path: GlobalRouterPath.feed,
            name: <FormattedMessage id="module.global.sider.app.feed.tooltip" />,
            icon: <HomeIcon />,
            onClick: () => navigate(GlobalRouterPath.feed),
        },
        {
            path: GlobalRouterPath.messenger,
            name: <FormattedMessage id="module.global.sider.app.messenger.tooltip" />,
            icon: <TelegramIcon />,
            onClick: () => navigate(GlobalRouterPath.messenger),
        },
        {
            path: GlobalRouterPath.calendar,
            name: <FormattedMessage id="module.global.sider.app.calendar.tooltip" />,
            icon: <CalendarMonthIcon />,
            onClick: () => navigate(GlobalRouterPath.calendar),
        },
        {
            path: GlobalRouterPath.game,
            name: <FormattedMessage id="module.global.sider.app.game.tooltip" />,
            icon: <GamesIcon />,
            onClick: () => navigate(GlobalRouterPath.game),
        },
    ]).current;

    const router = `/${pathname.split('/')[1]}`;

    const renderItem = (item: TypeAppItem) => {
        return <AppItem key={item.path} isSelected={item.path === router} isTooltip={isTooltip} item={item} />;
    };

    return <ListBase data={apps} renderItem={renderItem} />;
});

export default ListApp;
