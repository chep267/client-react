/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import Box from '@mui/material/Box';

/** components */
import AppHeader from '@module-global/components/AppHeader';
import AppMain from '@module-global/components/AppMain';

export default function MainScreen() {
    return (
        <Box className={clsx('relative', 'flex flex-col', 'h-dvh w-dvw')}>
            <AppHeader />
            <AppMain />
        </Box>
    );
}
