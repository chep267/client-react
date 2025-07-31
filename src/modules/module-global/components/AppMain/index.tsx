/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';

/** components */
import StartLoading from '@module-base/components/StartLoading';

/** lazy components */
const AppSider = React.lazy(() => import('@module-global/components/AppSider'));
const MainRoute = React.lazy(() => import('@module-global/components/AppMain/MainRoute'));
const AuthRoute = React.lazy(() => import('@module-auth/screens/AuthRoute'));

export default function AppMain() {
    return (
        <Box component="main" className="flex shrink grow" sx={{ paddingTop: `${AppScreenSize.HeaderHeight}px` }}>
            <Container id="app-container" className="flex h-full w-full max-w-full p-0">
                <React.Suspense fallback={<StartLoading />}>
                    <Routes>
                        <Route
                            path="*"
                            element={
                                <AuthRoute>
                                    <AppSider />
                                    <MainRoute />
                                </AuthRoute>
                            }
                        />
                    </Routes>
                </React.Suspense>
            </Container>
        </Box>
    );
}
