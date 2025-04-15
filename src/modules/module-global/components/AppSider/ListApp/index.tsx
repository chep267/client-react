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
import HomeIcon from '@mui/icons-material/Home';
import TelegramIcon from '@mui/icons-material/Telegram';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GamesIcon from '@mui/icons-material/Games';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** components */
import ListBase from '@module-base/components/ListBase';
import AppItem from './AppItem';

/** types */
import type { ListAppProps, TypeAppItem } from '@module-global/types';

export default function ListApp(props: ListAppProps) {
    const { hasTooltip } = props;

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const router = `/${pathname.split('/')[1]}`;

    const apps = React.useMemo<TypeAppItem[]>(
        () => [
            {
                path: AppRouterPath.feed,
                name: <FormattedMessage id={GlobalLanguage.component.label.feed} />,
                icon: <HomeIcon />,
                onClick: () => navigate(AppRouterPath.feed),
            },
            {
                path: AppRouterPath.messenger,
                name: <FormattedMessage id={GlobalLanguage.component.label.messenger} />,
                icon: <TelegramIcon />,
                onClick: () => navigate(AppRouterPath.messenger),
            },
            {
                path: AppRouterPath.calendar,
                name: <FormattedMessage id={GlobalLanguage.component.label.calendar} />,
                icon: <CalendarMonthIcon />,
                onClick: () => navigate(AppRouterPath.calendar),
            },
            {
                path: AppRouterPath.game,
                name: <FormattedMessage id={GlobalLanguage.component.label.game} />,
                icon: <GamesIcon />,
                onClick: () => navigate(AppRouterPath.game),
            },
        ],
        []
    );

    const itemContent = (item: TypeAppItem) => {
        return <AppItem key={item.path} isSelected={item.path === router} hasTooltip={hasTooltip} item={item} />;
    };

    return (
        <ListBase
            className={clsx('scrollbar-thin', { ['scrollbar-hidden']: hasTooltip })}
            data={apps}
            itemContent={itemContent}
        />
    );
}
