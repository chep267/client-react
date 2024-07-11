/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { SiderState } from '@module-global/constants/SiderState.ts';

/** utils */
import { genMatrixCalendarDayJS, reverseMatrix } from '@module-calendar/utils/CalendarServices.ts';

/** hooks */
import { useCalendar } from '@module-calendar/hooks/useCalendar.ts';
import { useSider } from '@module-global/hooks/useSider.ts';

/** components */
import TableBase from '@module-base/components/TableBase';
import CalendarLabel from '@module-calendar/components/CalendarTable/CalendarLabel';
import CalendarItem from '@module-calendar/components/CalendarTable/CalendarItem';

/** types */
import type { TableBaseProps } from '@module-base/types';
import type { CalendarTableDataType, CalendarTableProps } from '@module-calendar/types';

export default function CalendarTable(props: CalendarTableProps) {
    const { selectDay } = props;

    const {
        data: { day, isOnlyMonth, display },
        method: { isInMonth, isToday, setDay, isSelectedDay },
    } = useCalendar();
    const {
        data: { siderState },
    } = useSider();

    const tableRows = React.useMemo<TableBaseProps<CalendarTableDataType>['rows']>(() => {
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

        return output.map((day) => ({
            id: `${day}`,
            label: <CalendarLabel day={day} />,
            render: (item) => {
                const thisDay = item[day];
                const inMonth = isInMonth(thisDay);
                const onSelect = () => {
                    setDay(thisDay);
                    selectDay?.(thisDay);
                };
                return (
                    <CalendarItem
                        day={thisDay}
                        isToday={isToday(thisDay)}
                        isInMonth={inMonth}
                        isSelected={isSelectedDay(thisDay)}
                        isHide={!inMonth && isOnlyMonth}
                        onSelect={onSelect}
                    />
                );
            },
        }));
    }, [display, day, isOnlyMonth]);

    const tableData = React.useMemo(() => {
        const matrixCalendar = genMatrixCalendarDayJS(day, display);
        const output = reverseMatrix(matrixCalendar);
        return output.map((item) => Object.assign({}, item));
    }, [day, display]);

    const sxTable = React.useMemo(() => {
        const headerHeight = ScreenSize.HeaderHeight;
        const appBarMiniHeight = siderState === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0;
        const calendarSelectHeight = ScreenSize.CalendarSelectHeight;
        const paddingHeight = 2 * 16;
        const borderHeight = 2;
        return {
            height: `calc(100vh - ${headerHeight + appBarMiniHeight + calendarSelectHeight + paddingHeight + borderHeight}px)`,
            '& .MuiTableBody-root': {
                '& > tr:last-of-type > td': {
                    border: 'none',
                },
            },
        };
    }, [siderState]);

    return (
        <TableBase
            className="w-full p-3"
            sx={sxTable}
            rows={tableRows}
            data={tableData}
            tableCellProps={{ align: 'center' }}
        />
    );
}