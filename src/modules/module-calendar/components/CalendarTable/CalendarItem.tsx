/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** hooks */
import { useCalendar } from '@module-calendar/hooks/useCalendar';

/** types */
import type { CalendarItemProps } from '@module-calendar/types';

/** styles */
const useStyles = makeStyles(({ palette }: any) => ({
    item: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: palette.divider,
        },
    },
    itemSelected: {
        borderRadius: '50%',
        backgroundColor: palette.divider,
    },
    itemWeekend: {
        color: palette.error.main,
        '&:hover': {
            color: palette.common.white,
            backgroundColor: palette.error.main,
        },
    },
    itemWeekendSelected: {
        color: palette.common.white,
        backgroundColor: palette.error.main,
    },
    itemDifferentMonth: {
        color: palette.text.disabled,
    },
    itemToday: {
        borderRadius: '50%',
        color: palette.primary.main,
        border: `1px solid ${palette.primary.main}`,
        backgroundColor: 'transparent',
        '&:hover': {
            color: palette.common.white,
            backgroundColor: palette.primary.main,
        },
    },
    itemTodaySelected: {
        color: palette.common.white,
        backgroundColor: palette.primary.main,
    },
}));

export default function CalendarItem(props: CalendarItemProps) {
    const { day } = props;

    const {
        data: { isOnlyMonth },
        method: calendarMethod,
    } = useCalendar();
    const classes = useStyles();
    const isSelectedDay = calendarMethod.isSelectedDay(day);

    return React.useMemo(() => {
        const date = day.date();
        const isWeekend = calendarMethod.isWeekend(day);
        const isInMonth = calendarMethod.isInMonth(day);
        const isToday = calendarMethod.isToday(day);
        const onSelect = () => {
            calendarMethod.setDay(day);
            calendarMethod.setOpenCalendarModal(true);
        };
        return (
            <Stack
                className={classnames(
                    'm-auto h-12 w-12 items-center justify-center rounded-full',
                    classes.item,
                    { [classes.itemSelected]: isSelectedDay },
                    { [classes.itemWeekend]: isWeekend },
                    { [classes.itemToday]: isToday },
                    { [classes.itemTodaySelected]: isToday && isSelectedDay },
                    { [classes.itemWeekendSelected]: isWeekend && isSelectedDay },
                    { [classes.itemDifferentMonth]: !isInMonth },
                    { invisible: !isInMonth && isOnlyMonth }
                )}
                onClick={onSelect}
            >
                <Typography variant="h6">{date}</Typography>
            </Stack>
        );
    }, [isSelectedDay, isOnlyMonth]);
}
