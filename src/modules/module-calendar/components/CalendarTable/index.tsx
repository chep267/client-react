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
import TableBase from '@module-base/components/TableBase';
import CalendarLabel from '@module-calendar/components/CalendarTable/CalendarLabel';
import CalendarItem from '@module-calendar/components/CalendarTable/CalendarItem';

/** types */
import type { Dayjs } from 'dayjs';
import type { TableBaseProps } from '@module-base/types';
import type { CalendarTableDataType } from '@module-calendar/types';

export default function CalendarTable() {
    const hookCalendar = useCalendar();
    const {
        data: { day, display },
    } = hookCalendar;

    const tableData = React.useMemo(() => {
        const matrixCalendar = genMatrixCalendarDayJS(day, display);
        const output = reverseMatrix(matrixCalendar);
        return output.map((item) => item);
    }, [day.month(), day.year(), display]);

    const columns = React.useMemo<TableBaseProps<Dayjs[]>['columns']>(() => {
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
            dataKey: id,
            label: <CalendarLabel day={id} />,
            className: 'max-sm:p-0',
            itemContent: ({ item }) => <CalendarItem day={item[id]} />,
        }));
    }, [display]);

    return <TableBase className="scrollbar-thin mt-5 md:mt-10" data={tableData} columns={columns} />;
}
