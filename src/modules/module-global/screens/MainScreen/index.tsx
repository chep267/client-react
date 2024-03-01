/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** lib components */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';

/** components */
import { StartLoading } from '@module-base/components';
import { AppHeader, AppMain, AppSider, SiderProvider } from '@module-global/components';

/** screens */
import AuthRoute from '@module-auth/screens/AuthRoute';

export default function MainScreen() {
    const renderMain = () => (
        <SiderProvider>
            <AppSider />
            <AppMain />
        </SiderProvider>
    );

    return (
        <BrowserRouter>
            <Box className="flex w-screen h-screen">
                <Box className="flex flex-col grow shrink w-auto max-w-full min-h-dvh relative backface-hidden direction-lrt">
                    <AppHeader />
                    <Box className="grow shrink-0 w-auto max-w-full pt-16 direction-lrt" component="main">
                        <Container id="container" className="flex w-full h-full max-w-full mx-auto p-0 direction-lrt">
                            <React.Suspense fallback={<StartLoading />}>
                                <Routes>
                                    <Route path="*" element={<AuthRoute>{renderMain()}</AuthRoute>} />
                                </Routes>
                            </React.Suspense>
                        </Container>
                    </Box>
                </Box>
            </Box>
        </BrowserRouter>
    );
}
