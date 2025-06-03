/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** hooks */
import { useCalendar } from '@module-calendar/hooks/useCalendar';

/** types */
import type { SxProps, Theme } from '@mui/material/styles';
import type { CalendarItemProps } from '@module-calendar/types';

const ItemContent = React.memo(function ItemContent(props: CalendarItemProps) {
    const { day, isToday, isWeekend, isInMonth, isOnlyMonth, isSelectedDay, onSelect } = props;
    const styleItem: SxProps<Theme> = [
        {
            '&:hover': {
                backgroundColor: 'divider',
                borderColor: 'divider',
            },
        },
        Boolean(!isInMonth && !isSelectedDay) && {
            color: 'text.disabled',
        },
        Boolean(isSelectedDay) && {
            border: '1px solid',
            color: 'text.disabled',
        },
        Boolean(isToday) && {
            border: '1px solid',
            color: 'primary.main',
            '&:hover': {
                color: 'common.white',
                backgroundColor: 'primary.main',
                borderColor: 'primary.main',
            },
        },
        Boolean(isWeekend) && {
            color: 'error.main',
            '&:hover': {
                color: 'common.white',
                backgroundColor: 'error.main',
                borderColor: 'error.main',
            },
        },
        Boolean(isToday && isWeekend) && {
            color: 'error.main',
            '&:hover': {
                color: 'common.white',
                backgroundColor: 'error.main',
                borderColor: 'error.main',
            },
        },
    ];

    return (
        <Box
            className={clsx('group m-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full', {
                ['invisible']: isOnlyMonth && !isInMonth,
            })}
            sx={styleItem}
            onClick={onSelect}
        >
            <Typography className={clsx('group-hover:font-bold')}>{day.date()}</Typography>
        </Box>
    );
});

export default function CalendarItem(props: Pick<CalendarItemProps, 'day'>) {
    const { day } = props;

    const {
        data: { isOnlyMonth },
        method: calendarMethod,
    } = useCalendar();

    const onSelect = React.useCallback(() => {
        calendarMethod.setDay(day);
        calendarMethod.setOpenCalendarModal(true);
    }, [day]);

    const isWeekend = calendarMethod.isWeekend(day);
    const isInMonth = calendarMethod.isInMonth(day);
    const isToday = calendarMethod.isToday(day);
    const isSelectedDay = calendarMethod.isSelectedDay(day);

    return (
        <ItemContent
            day={day}
            isToday={isToday}
            isWeekend={isWeekend}
            isInMonth={isInMonth}
            isSelectedDay={isSelectedDay}
            isOnlyMonth={isOnlyMonth}
            onSelect={onSelect}
        />
    );
}
