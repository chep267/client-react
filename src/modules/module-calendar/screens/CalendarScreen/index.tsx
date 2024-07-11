/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

/** components */
import CalendarSelect from '@module-calendar/components/CalendarSelect';
import CalendarTable from '@module-calendar/components/CalendarTable';
import CalendarModal from '@module-calendar/components/CalendarModal';

/** types */
import type { Dayjs } from '@module-calendar/types';

export default function CalendarScreen() {
    const [selectedDay, setSelectedDay] = React.useState<Dayjs | undefined>();

    return (
        <Stack id="CalendarScreen" className="w-full h-full p-1 sm:p-2">
            <Paper className="flex flex-col w-full h-full justify-center items-center rounded-md overflow-hidden">
                <CalendarSelect />
                <CalendarTable selectDay={setSelectedDay} />
                <CalendarModal day={selectedDay} onClose={() => setSelectedDay(undefined)} />
            </Paper>
        </Stack>
    );
}
