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

/** components */
import StartLoading from '@module-base/components/StartLoading';
import AppSider from '@module-global/components/AppSider';

/** screens */
import AuthRoute from '@module-auth/screens/AuthRoute';
import MainRouter from '@module-global/components/AppMain/MainRouter.tsx';

export default function AppMain() {
    return (
        <Box className="direction-lrt flex w-auto max-w-full shrink-0 grow pt-16" component="main">
            <Container id="container" className="direction-lrt mx-auto flex h-full w-full max-w-full !p-0">
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
