/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

/** constants */
import { ScreenSize } from '@module-global/constants/ScreenSize.ts';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage.ts';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage.ts';
import { useCalendar } from '@module-calendar/hooks/useCalendar.ts';

/** styles */
const useStyles = makeStyles({
    datePiker: {
        '& .MuiInputBase-root': {
            cursor: 'pointer',
            height: '100%',
            padding: 0,
            '& > input': {
                display: 'none',
            },
            '& .MuiInputAdornment-root': {
                width: '100%',
                height: '100%',
                margin: 0,
                maxHeight: '100%',
                '& > button': {
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                },
            },
        },
    },
});

const CalendarSelect = React.memo(function CalendarSelect() {
    const {
        data: { locale },
    } = useLanguage();
    const {
        data: { day, today },
        method: calendarMethod,
    } = useCalendar();
    const classes = useStyles();
    const sxStyles = React.useRef({ height: ScreenSize.CalendarSelectHeight }).current;

    const isToday = calendarMethod.isToday(day);
    const timeMonthYear = React.useMemo(() => {
        return { month: day.format(locale === 'en' ? 'MMMM' : 'MM'), year: day.format('YYYY') };
    }, [day.month(), day.year()]);

    const onChangeTime = React.useCallback((mode: 'prev' | 'next', type: 'month' | 'year') => {
        calendarMethod.setDay((prevDay) => prevDay.add(mode === 'prev' ? -1 : 1, type));
    }, []);

    const ButtonToday = React.useMemo(() => {
        return (
            <Button
                variant="contained"
                size="large"
                className="rounded-md capitalize truncate"
                onClick={() => calendarMethod.setDay(today)}
                disabled={isToday}>
                <FormattedMessage id={CalendarLanguage.component.label.today} />
            </Button>
        );
    }, [isToday]);

    const ButtonLeft = React.useMemo(() => {
        return (
            <Stack className="flex-row items-center gap-1">
                <IconButton onClick={() => onChangeTime('prev', 'year')}>
                    <KeyboardDoubleArrowLeft color="primary" />
                </IconButton>
                <IconButton onClick={() => onChangeTime('prev', 'month')}>
                    <KeyboardArrowLeft color="primary" />
                </IconButton>
            </Stack>
        );
    }, []);

    const ButtonRight = React.useMemo(() => {
        return (
            <Stack className="flex-row items-center gap-1">
                <IconButton onClick={() => onChangeTime('next', 'month')}>
                    <KeyboardArrowRight color="primary" />
                </IconButton>
                <IconButton onClick={() => onChangeTime('next', 'year')}>
                    <KeyboardDoubleArrowRight color="primary" />
                </IconButton>
            </Stack>
        );
    }, []);

    const DateTimePicker = React.useMemo(() => {
        return (
            <Stack
                className={classnames(
                    'flex-row justify-center items-center relative w-full rounded-md cursor-pointer line-clamp-2 text-center',
                    {
                        'sm:min-w-[300px]': true, // pc
                    }
                )}>
                <Typography variant="h5" color="primary.main">
                    <FormattedMessage id={CalendarLanguage.component.label.calendarInfo.title} values={timeMonthYear} />
                </Typography>
                <DatePicker
                    className={classnames(
                        'absolute opacity-0 top-0 left-0 right-0 bottom-0 cursor-pointer',
                        classes.datePiker
                    )}
                    views={['month', 'year']}
                    value={day}
                    onChange={calendarMethod.setDay}
                />
            </Stack>
        );
    }, [timeMonthYear]);

    return (
        <Stack
            className={classnames('flex-row justify-between items-center w-full p-3 gap-2', {
                'max-sm:flex-col': true, // mobile
            })}
            sx={sxStyles}>
            {ButtonToday}
            <Stack
                className={classnames('flex-row justify-between items-center gap-2', {
                    'max-sm:w-full': true, // mobile
                })}>
                {ButtonLeft}
                {DateTimePicker}
                {ButtonRight}
            </Stack>
        </Stack>
    );
});

export default CalendarSelect;
