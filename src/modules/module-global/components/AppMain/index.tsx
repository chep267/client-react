/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** components */
import StartLoading from '@module-base/components/StartLoading';

/** lazy components */
const AppSider = React.lazy(() => import('@module-global/components/AppSider'));
const MainRouter = React.lazy(() => import('@module-global/components/AppMain/MainRouter'));
const AuthRoute = React.lazy(() => import('@module-auth/screens/AuthRoute'));

export default function AppMain() {
    return (
        <Box
            className="flex w-auto max-w-full shrink-0 grow"
            sx={{ paddingTop: `${ScreenSize.HeaderHeight}px` }}
            component="main"
        >
            <Container id="container" className="mx-auto flex h-full w-full max-w-full p-0">
                <React.Suspense fallback={<StartLoading />}>
                    <Routes>
                        <Route
                            path="*"
                            element={
                                <AuthRoute>
                                    <AppSider />
                                    <MainRouter />
                                </AuthRoute>
                            }
                        />
                    </Routes>
                </React.Suspense>
            </Container>
        </Box>
    );
}
