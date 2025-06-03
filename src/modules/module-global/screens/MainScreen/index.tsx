/**
 *
 * @author dongntd267@gmail.com
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
            <Box className="relative flex h-screen w-screen flex-col">
                <AppHeader />
                <AppMain />
            </Box>
        </BrowserRouter>
    );
}
