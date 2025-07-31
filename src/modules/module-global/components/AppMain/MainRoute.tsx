/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

/** constants */
import { AppRouterPath } from '@module-base/constants/AppRouterPath';

/** components */
import AppSiderMini from '@module-global/components/AppSiderMini';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const TestScreen = React.lazy(() => import('@module-global/screens/TestScreen'));

export default function MainRoute() {
    return (
        <Box className="flex h-full w-full flex-col transition-[width]">
            <AppSiderMini />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={AppRouterPath.home} element={<Navigate to={AppRouterPath.defaultPath} />} />
                    <Route path={`${AppRouterPath.feed}/*`} element={<TestScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </React.Suspense>
        </Box>
    );
}
