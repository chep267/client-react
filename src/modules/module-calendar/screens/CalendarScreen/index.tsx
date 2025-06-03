/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** components */
import CalendarSelect from '@module-calendar/components/CalendarSelect';
import CalendarTable from '@module-calendar/components/CalendarTable';
import CalendarModal from '@module-calendar/components/CalendarModal';

export default function CalendarScreen() {
    return (
        <Box className="h-full w-full p-1 sm:p-4">
            <Paper className="flex h-full w-full flex-col items-center overflow-hidden rounded-md">
                <CalendarSelect />
                <CalendarTable />
                <CalendarModal />
            </Paper>
        </Box>
    );
}
