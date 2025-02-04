/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';

/** components */
import AppHeader from '@module-global/components/AppHeader';
import AppMain from '@module-global/components/AppMain';

export default function MainScreen() {
    return (
        <BrowserRouter>
            <Box className="flex h-screen w-screen">
                <Box className="direction-lrt relative flex min-h-dvh w-auto max-w-full shrink grow flex-col backface-hidden">
                    <AppHeader />
                    <AppMain />
                </Box>
            </Box>
        </BrowserRouter>
    );
}
