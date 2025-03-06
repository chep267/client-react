/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { CalendarRouterPath } from '@module-calendar/constants/CalendarRouterPath';
import { GameRouterPath } from '@module-game/constants/GameRouterPath';
import { MessengerRouterPath } from '@module-messenger/constants/MessengerRouterPath';

export const GlobalRouterPath = {
    home: '/',
    start: '/start',
    notFound: '/not-found',
    defaultPath: MessengerRouterPath.messenger,
    calendar: CalendarRouterPath.calendar,
    game: GameRouterPath.game,
    feed: '/feed',
    messenger: MessengerRouterPath.messenger,
};
