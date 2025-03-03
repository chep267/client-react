/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay';

/** utils */
import { genMatrixCalendarDayJS, reverseMatrix } from '@module-calendar/utils/CalendarServices';

/** hooks */
import { useCalendar } from '@module-calendar/hooks/useCalendar';

/** components */
import VirtualTable from '@module-base/components/VirtualTable';
import CalendarLabel from '@module-calendar/components/CalendarTable/CalendarLabel';
import CalendarItem from '@module-calendar/components/CalendarTable/CalendarItem';

/** types */
import type { VirtualTableProps } from '@module-base/types';
import type { CalendarTableDataType } from '@module-calendar/types';

export default function CalendarTable() {
    const hookCalendar = useCalendar();
    const {
        data: { day, display },
    } = hookCalendar;

    const columns = React.useMemo<VirtualTableProps['columns']>(() => {
        let output: (keyof CalendarTableDataType)[];
        switch (display) {
            case CalendarDisplay.weekend:
                output = [6, 0, 1, 2, 3, 4, 5];
                break;
            case CalendarDisplay.monday:
                output = [1, 2, 3, 4, 5, 6, 0];
                break;
            case CalendarDisplay.sunday:
            default:
                output = [0, 1, 2, 3, 4, 5, 6];
                break;
        }
        return output.map((id) => ({
            dataKey: `${id}`,
            label: <CalendarLabel day={id} />,
            renderItem: ({ value }) => <CalendarItem day={value} />,
        }));
    }, [display]);

    const tableData = React.useMemo(() => {
        const matrixCalendar = genMatrixCalendarDayJS(day, display);
        const output = reverseMatrix(matrixCalendar);
        return output.map((item) => item);
    }, [day.month(), day.year(), display]);

    return <VirtualTable data={tableData} columns={columns} />;
}
