/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';
import { useCalendar } from '@module-calendar/hooks/useCalendar';

export default function CalendarSelect() {
    const hookLanguage = useLanguage();
    const hookCalendar = useCalendar();
    const { locale } = hookLanguage.data;
    const { day } = hookCalendar.data;

    const timeMonthYear = React.useMemo(() => {
        return {
            month: day.format(locale === 'en' ? 'MMMM' : 'MM'),
            year: day.format('YYYY'),
        };
    }, [day.month(), day.year(), locale]);

    const onChangeTime = React.useCallback((mode: 'prev' | 'next', type: 'month' | 'year') => {
        hookCalendar.method.setDay((prevDay) => prevDay.add(mode === 'prev' ? -1 : 1, type));
    }, []);

    const ButtonLeft = React.useMemo(() => {
        return (
            <Box className="flex flex-row items-center gap-1">
                <IconButton onClick={() => onChangeTime('prev', 'year')}>
                    <KeyboardDoubleArrowLeft color="primary" />
                </IconButton>
                <IconButton onClick={() => onChangeTime('prev', 'month')}>
                    <KeyboardArrowLeft color="primary" />
                </IconButton>
            </Box>
        );
    }, []);

    const ButtonRight = React.useMemo(() => {
        return (
            <Box className="flex flex-row items-center gap-1">
                <IconButton onClick={() => onChangeTime('next', 'month')}>
                    <KeyboardArrowRight color="primary" />
                </IconButton>
                <IconButton onClick={() => onChangeTime('next', 'year')}>
                    <KeyboardDoubleArrowRight color="primary" />
                </IconButton>
            </Box>
        );
    }, []);

    const DateTimePicker = React.useMemo(() => {
        return (
            <Box
                className={classnames(
                    'relative line-clamp-2 flex w-full cursor-pointer flex-row items-center justify-center rounded-md text-center',
                    'sm:min-w-[300px]'
                )}
            >
                <Typography variant="h5" color="primary.main">
                    <FormattedMessage id={CalendarLanguage.component.label.calendarInfo.title} values={timeMonthYear} />
                </Typography>
                <DatePicker
                    className={classnames('absolute top-0 right-0 bottom-0 left-0 cursor-pointer opacity-0')}
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
            className={classnames(
                'flex w-full items-start justify-between gap-2',
                'flex-col-reverse px-1',
                'md:flex-row md:p-3'
            )}
            sx={{ height: ScreenSize.CalendarSelectHeight, minHeight: ScreenSize.CalendarSelectHeight }}
        >
            <Button
                variant="contained"
                size="large"
                className="w-max truncate rounded-md capitalize"
                disabled={hookCalendar.method.isToday(day)}
                onClick={() => hookCalendar.method.setDay(hookCalendar.data.today)}
            >
                <FormattedMessage id={CalendarLanguage.component.label.today} />
            </Button>
            <Box className={classnames('flex flex-row items-center justify-between gap-2', 'w-full', 'md:w-fit')}>
                {ButtonLeft}
                {DateTimePicker}
                {ButtonRight}
            </Box>
        </Box>
    );
}
