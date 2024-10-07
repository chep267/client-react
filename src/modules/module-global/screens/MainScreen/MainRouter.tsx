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
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { SiderState } from '@module-global/constants/SiderState.ts';

/** hooks */
import { useSider } from '@module-global/hooks/useSider.ts';

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

/** components */
import AppSiderMini from '@module-global/components/AppSiderMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-global/screens/NotFoundScreen'));
const TestScreen = React.lazy(() => import('@module-global/screens/TestScreen'));
const CalendarScreen = React.lazy(() => import('@module-calendar/screens/CalendarScreen'));
const GameCenterScreen = React.lazy(() => import('@module-game/screens/GameCenterScreen'));

const windowHasScroll = () => {
    return document.body.scrollHeight > document.body.clientHeight;
};

export default function MainRouter() {
    const location = useLocation();
    const {
        data: { siderState },
    } = useSider();

    const [hasScroll, setHasScroll] = React.useState(false);

    const sxStyles = React.useRef({
        [SiderState.hidden]: { width: 'calc(100%)' },
        [SiderState.expand]: { width: `calc(100% - ${ScreenSize.AppBarExpandWidth}px)` },
        [SiderState.collapse]: { width: `calc(100% - ${ScreenSize.AppBarCollapseWidth}px)` },
        [SiderState.force]: { width: `calc(100% - ${ScreenSize.AppBarCollapseWidth}px)` },
    }).current;

    React.useEffect(() => {
        debounce(100, () => setHasScroll(windowHasScroll())).then();
    }, [location]);

    return (
        <Box
            className={classnames('flex flex-col h-full max-sm:w-full transition-[width] duration-500', {
                ['pr-4 max-sm:pr-0']: hasScroll,
            })}
            sx={sxStyles[siderState]}>
            <AppSiderMini />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={GlobalRouterPath.home} element={<Navigate to={GlobalRouterPath.defaultPath} />} />
                    <Route path={`${GlobalRouterPath.feed}/*`} element={<TestScreen />} />
                    <Route path={`${GlobalRouterPath.messenger}/*`} element={<NotFoundScreen />} />
                    <Route path={`${GlobalRouterPath.calendar}/*`} element={<CalendarScreen />} />
                    <Route path={`${GlobalRouterPath.game}/*`} element={<GameCenterScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </Box>
    );
}
