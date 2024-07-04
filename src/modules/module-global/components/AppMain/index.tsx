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
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';

/** hooks */
import { useSider } from '@module-global/hooks/useSider.ts';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-global/screens/NotFoundScreen'));
const TestScreen = React.lazy(() => import('@module-global/screens/TestScreen'));

export default function AppMain() {
    const {
        data: { openSider },
    } = useSider();

    return (
        <Box
            className={classnames(
                'flex h-full max-[567px]:w-full transition-[width] duration-500 pr-4',
                { ['w-app-main-app-bar-expand']: openSider },
                { ['w-app-main-app-bar-collapse']: !openSider }
            )}>
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={ScreenPath.home} element={<Navigate to={ScreenPath.defaultPath} />} />
                    <Route path={`${ScreenPath.feed}/*`} element={<TestScreen />} />
                    <Route path={`${ScreenPath.messenger}/*`} element={<NotFoundScreen />} />
                    <Route path={`${ScreenPath.calendar}/*`} element={<NotFoundScreen />} />
                    <Route path={`${ScreenPath.messenger}/*`} element={<NotFoundScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </Box>
    );
}
