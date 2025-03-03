/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** hooks */
import { useCalendar } from '@module-calendar/hooks/useCalendar';

/** types */
import type { SxProps, Theme } from '@mui/material/styles';
import type { CalendarItemProps } from '@module-calendar/types';

export default function CalendarItem(props: CalendarItemProps) {
    const { day } = props;

    const {
        data: { isOnlyMonth },
        method: calendarMethod,
    } = useCalendar();

    const date = day.date();
    const isWeekend = calendarMethod.isWeekend(day);
    const isInMonth = calendarMethod.isInMonth(day);
    const isToday = calendarMethod.isToday(day);

    const onSelect = () => {
        calendarMethod.setDay(day);
        calendarMethod.setOpenCalendarModal(true);
    };

    const styleItem: SxProps<Theme> = [
        {
            '&:hover': {
                backgroundColor: 'divider',
            },
        },
        isWeekend && {
            color: 'error.main',
            '&:hover': {
                color: 'common.white',
                backgroundColor: 'error.main',
            },
        },
        !isInMonth && {
            color: 'text.disabled',
        },
        isToday && {
            border: '1px solid',
            color: 'primary.main',
        },
    ];

    return (
        <Box
            className={classnames('group m-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full', {
                ['invisible']: !isInMonth && isOnlyMonth,
            })}
            sx={styleItem}
            onClick={onSelect}
        >
            <Typography className={classnames('group-hover:font-bold')}>{date}</Typography>
        </Box>
    );
}
