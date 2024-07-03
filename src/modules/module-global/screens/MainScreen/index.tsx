/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/** components */
import StartLoading from '@module-base/components/StartLoading';
import AppHeader from '@module-global/components/AppHeader';
import AppMain from '@module-global/components/AppMain';
import AppSider from '@module-global/components/AppSider';
import SiderProvider from '@module-global/components/SiderProvider';

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
