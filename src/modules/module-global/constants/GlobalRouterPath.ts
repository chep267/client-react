/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { CalendarRouterPath } from '@module-calendar/constants/CalendarRouterPath.ts';
import { GameRouterPath } from '@module-game/constants/GameRouterPath.ts';

export const GlobalRouterPath = {
    home: '/',
    start: '/start',
    notFound: '/not-found',
    defaultPath: CalendarRouterPath.calendar,
    calendar: CalendarRouterPath.calendar,
    game: GameRouterPath.game,
    feed: '/feed',
    messenger: '/messenger',
};
