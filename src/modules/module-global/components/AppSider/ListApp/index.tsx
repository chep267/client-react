/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** lib components */
import { FormattedMessage } from 'react-intl';

/** icons */
import {
    Home as HomeIcon,
    Telegram as TelegramIcon,
    CalendarMonth as CalendarMonthIcon,
    Games as GamesIcon,
} from '@mui/icons-material';

/** components */
import { ListBase } from '@module-base/components';
import AppItem from './AppItem';

/** constants */
import { ScreenPath } from '@module-global/constants';

/** types */
import type { ListAppProps, TypeAppItem } from '@module-global/models';

const ListApp = React.memo(function ListApp(props: ListAppProps) {
    const { isTooltip } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const MENU_ROUTER = React.useRef<TypeAppItem[]>([
        {
            path: ScreenPath.FEED,
            name: <FormattedMessage id="module.global.sider.app.feed.tooltip" />,
            icon: <HomeIcon />,
            onClick: () => navigate(ScreenPath.FEED),
        },
        {
            path: ScreenPath.MESSENGER,
            name: <FormattedMessage id="module.global.sider.app.messenger.tooltip" />,
            icon: <TelegramIcon />,
            onClick: () => navigate(ScreenPath.MESSENGER),
        },
        {
            path: ScreenPath.CALENDAR,
            name: <FormattedMessage id="module.global.sider.app.calendar.tooltip" />,
            icon: <CalendarMonthIcon />,
            onClick: () => navigate(ScreenPath.CALENDAR),
        },
        {
            path: ScreenPath.GAME,
            name: <FormattedMessage id="module.global.sider.app.game.tooltip" />,
            icon: <GamesIcon />,
            onClick: () => navigate(ScreenPath.GAME),
        },
    ]).current;

    const router = `/${pathname.split('/')[1]}`;

    const renderItem = (item: TypeAppItem) => {
        return <AppItem key={item.path} isSelected={item.path === router} isTooltip={isTooltip} item={item} />;
    };

    return <ListBase data={MENU_ROUTER} renderItem={renderItem} />;
});

export default ListApp;
