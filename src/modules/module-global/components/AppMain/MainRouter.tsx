/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { SiderState } from '@module-base/constants/SiderState';
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';

/** hooks */
import { useSider } from '@module-base/hooks/useSider';

/** utils */
import { delay } from '@module-base/utils/delay';

/** components */
import AppSiderMini from '@module-global/components/AppSiderMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-global/screens/NotFoundScreen'));
const TestScreen = React.lazy(() => import('@module-global/screens/TestScreen'));
// const ConversationScreen = React.lazy(() => import('@module-messenger/screens/ConversationScreen'));
const CalendarScreen = React.lazy(() => import('@module-calendar/screens/CalendarScreen'));
const GameCenterScreen = React.lazy(() => import('@module-game/screens/GameCenterScreen'));

export default function MainRouter() {
    const location = useLocation();
    const hookSider = useSider();

    const [hasScroll, setHasScroll] = React.useState(false);

    const sxStyles = React.useRef({
        [SiderState.hidden]: { width: 'calc(100%)' },
        [SiderState.expand]: { width: `calc(100% - ${ScreenSize.AppBarExpandWidth}px)` },
        [SiderState.collapse]: { width: `calc(100% - ${ScreenSize.AppBarCollapseWidth}px)` },
        [SiderState.force]: { width: `calc(100% - ${ScreenSize.AppBarCollapseWidth}px)` },
    }).current;

    React.useEffect(() => {
        delay(100, () => {
            const hasScroll = document.body.scrollHeight > document.body.clientHeight;
            setHasScroll(hasScroll);
        }).then();
    }, [location]);

    return (
        <Box
            className={classnames('flex h-full w-full flex-col transition-[width] duration-500', {
                ['pr-0 sm:pr-4']: hasScroll,
            })}
            sx={sxStyles[hookSider.data.siderState]}
        >
            <AppSiderMini />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={GlobalRouterPath.home} element={<Navigate to={GlobalRouterPath.defaultPath} />} />
                    <Route path={`${GlobalRouterPath.feed}/*`} element={<TestScreen />} />
                    <Route path={`${GlobalRouterPath.messenger}/*`} element={<TestScreen />} />
                    <Route path={`${GlobalRouterPath.calendar}/*`} element={<CalendarScreen />} />
                    <Route path={`${GlobalRouterPath.game}/*`} element={<GameCenterScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </Box>
    );
}
