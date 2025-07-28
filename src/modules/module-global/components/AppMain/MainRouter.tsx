/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';

/** components */
import AppSiderMini from '@module-global/components/AppSiderMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const TestScreen = React.lazy(() => import('@module-global/screens/TestScreen.tsx'));
// const MessengerScreen = React.lazy(() => import('@module-messenger/screens/MessengerScreen'));
// const CalendarScreen = React.lazy(() => import('@module-calendar/screens/CalendarScreen'));
// const GameScreen = React.lazy(() => import('@module-game/screens/GameScreen'));

export default function MainRouter() {
    return (
        <Box className={clsx('flex h-full w-full flex-col transition-[width]')}>
            <AppSiderMini />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={AppRouterPath.home} element={<Navigate to={AppRouterPath.defaultPath} />} />
                    <Route path={`${AppRouterPath.feed}/*`} element={<TestScreen />} />
                    {/*<Route path={`${AppRouterPath.messenger}/*`} element={<MessengerScreen />} />*/}
                    {/*<Route path={`${AppRouterPath.calendar}/*`} element={<CalendarScreen />} />*/}
                    {/*<Route path={`${AppRouterPath.game}/*`} element={<GameScreen />} />*/}
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </Box>
    );
}
