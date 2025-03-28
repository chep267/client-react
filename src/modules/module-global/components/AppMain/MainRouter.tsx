/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

/** constants */
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';

/** components */
import AppSiderMini from '@module-global/components/AppSiderMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const TestScreen = React.lazy(() => import('@module-global/screens/TestScreen'));
const MessengerScreen = React.lazy(() => import('@module-messenger/screens/MessengerScreen'));
const CalendarScreen = React.lazy(() => import('@module-calendar/screens/CalendarScreen'));
const GameScreen = React.lazy(() => import('@module-game/screens/GameScreen'));

export default function MainRouter() {
    return (
        <Box className={classnames('flex h-full w-full flex-col transition-[width]')}>
            <AppSiderMini />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={GlobalRouterPath.home} element={<Navigate to={GlobalRouterPath.defaultPath} />} />
                    <Route path={`${GlobalRouterPath.feed}/*`} element={<TestScreen />} />
                    <Route path={`${GlobalRouterPath.messenger}/*`} element={<MessengerScreen />} />
                    <Route path={`${GlobalRouterPath.calendar}/*`} element={<CalendarScreen />} />
                    <Route path={`${GlobalRouterPath.game}/*`} element={<GameScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </Box>
    );
}
