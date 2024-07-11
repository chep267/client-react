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
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { SiderState } from '@module-global/constants/SiderState.ts';

/** hooks */
import { useSider } from '@module-global/hooks/useSider.ts';

/** components */
import AppSiderMini from '@module-global/components/AppSiderMini';
import AppSider from '@module-global/components/AppSider';
import SiderProvider from '@module-global/components/SiderProvider';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-global/screens/NotFoundScreen'));
const TestScreen = React.lazy(() => import('@module-global/screens/TestScreen'));
const CalendarScreen = React.lazy(() => import('@module-calendar/screens/CalendarScreen'));

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
        setTimeout(() => {
            setHasScroll(windowHasScroll());
        }, 100);
    }, [location]);

    return (
        <Box
            className={classnames('flex flex-col h-full max-sm:w-full transition-[width] duration-500', {
                'pr-4': hasScroll,
            })}
            sx={sxStyles[siderState]}>
            <AppSiderMini />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={ScreenPath.home} element={<Navigate to={ScreenPath.defaultPath} />} />
                    <Route path={`${ScreenPath.feed}/*`} element={<TestScreen />} />
                    <Route path={`${ScreenPath.messenger}/*`} element={<NotFoundScreen />} />
                    <Route path={`${ScreenPath.calendar}/*`} element={<CalendarScreen />} />
                    <Route path={`${ScreenPath.messenger}/*`} element={<NotFoundScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </Box>
    );
}
