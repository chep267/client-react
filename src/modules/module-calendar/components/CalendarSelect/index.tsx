/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import useMediaQuery from '@mui/material/useMediaQuery';

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';
import { useCalendar } from '@module-calendar/hooks/useCalendar';

export default function CalendarSelect() {
    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const hookLanguage = useLanguage();
    const hookCalendar = useCalendar();
    const { locale } = hookLanguage.data;
    const { day } = hookCalendar.data;

    const timeMonthYear = React.useMemo(() => {
        return {
            month: day.locale(locale).format(isMobileScreen ? 'MM' : 'MMMM'),
            year: day.locale(locale).format('YYYY'),
        };
    }, [day.month(), day.year(), isMobileScreen, locale]);

    const onChangeTime = React.useCallback((mode: 'prev' | 'next', type: 'month' | 'year') => {
        hookCalendar.method.setDay((prevDay) => prevDay.add(mode === 'prev' ? -1 : 1, type));
    }, []);

    const ButtonLeft = React.useMemo(() => {
        return (
            <Box className={clsx('flex flex-row items-center gap-1', 'sm:gap-2')}>
                <Button className="min-w-0" variant="outlined" size="small" onClick={() => onChangeTime('prev', 'year')}>
                    <KeyboardDoubleArrowLeft color="primary" />
                </Button>
                <Button className="min-w-0" variant="outlined" size="small" onClick={() => onChangeTime('prev', 'month')}>
                    <KeyboardArrowLeft color="primary" />
                </Button>
            </Box>
        );
    }, []);

    const ButtonRight = React.useMemo(() => {
        return (
            <Box className={clsx('flex flex-row items-center gap-1', 'sm:gap-2')}>
                <Button className="min-w-0" variant="outlined" size="small" onClick={() => onChangeTime('next', 'month')}>
                    <KeyboardArrowRight color="primary" />
                </Button>
                <Button className="min-w-0" variant="outlined" size="small" onClick={() => onChangeTime('next', 'year')}>
                    <KeyboardDoubleArrowRight color="primary" />
                </Button>
            </Box>
        );
    }, []);

    const DateTimePicker = React.useMemo(() => {
        return (
            <Box
                className={clsx(
                    'relative flex w-full cursor-pointer flex-row items-start justify-center rounded-md text-center'
                )}
            >
                <Typography variant="h5" color="primary" className="line-clamp-2 capitalize">
                    <FormattedMessage id={CalendarLanguage.component.label.calendarInfo.title} values={timeMonthYear} />
                </Typography>
                <DatePicker
                    className={clsx('absolute top-0 right-0 bottom-0 left-0 cursor-pointer opacity-0')}
                    sx={{
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
                    }}
                    views={['month', 'year']}
                    value={day}
                    onChange={(value) => value && hookCalendar.method.setDay(value)}
                />
            </Box>
        );
    }, [timeMonthYear]);

    return (
        <Box
            className={clsx(
                'flex h-fit w-full items-start justify-between gap-2',
                'flex-col-reverse p-2',
                'md:flex-row md:p-3'
            )}
        >
            <Button
                variant="contained"
                size="small"
                className="w-max truncate rounded-md capitalize"
                disabled={hookCalendar.method.isToday(day)}
                onClick={() => hookCalendar.method.setDay(hookCalendar.data.today)}
            >
                <FormattedMessage id={CalendarLanguage.component.label.today} />
            </Button>
            <Box
                className={clsx('flex flex-row items-start justify-between gap-1', 'w-full', 'sm:gap-2', 'md:w-fit md:gap-5')}
            >
                {ButtonLeft}
                {DateTimePicker}
                {ButtonRight}
            </Box>
        </Box>
    );
}
