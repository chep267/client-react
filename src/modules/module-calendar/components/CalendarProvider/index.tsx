/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/** contexts */
import { CalendarContext, defaultCalendarState } from '@module-calendar/contexts/CalendarContext.ts';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage.ts';

/** types */
import type { PropsWithChildren } from 'react';
import type { CalendarContextProps } from '@module-calendar/types';

export default function CalendarProvider(props: PropsWithChildren) {
    const { children } = props;

    const {
        data: { locale },
    } = useLanguage();

    const [display, setDisplay] = React.useState<CalendarContextProps['data']['display']>(defaultCalendarState.display);
    const [isOnlyMonth, setIsOnlyMonth] = React.useState(defaultCalendarState.isOnlyMonth);
    const [day, setDay] = React.useState<CalendarContextProps['data']['day']>(defaultCalendarState.day);
    const [openCalendarModal, setOpenCalendarModal] = React.useState<CalendarContextProps['data']['openCalendarModal']>(
        defaultCalendarState.openCalendarModal
    );

    const isToday = React.useCallback<CalendarContextProps['method']['isToday']>((data) => {
        const today = defaultCalendarState.today;
        return data.date() === today.date() && data.month() === today.month() && data.year() === today.year();
    }, []);

    const isWeekend = React.useCallback<CalendarContextProps['method']['isWeekend']>((data) => {
        const thisDay = typeof data === 'number' ? data : data.day();
        return thisDay === 0 || thisDay === 6;
    }, []);

    const isInMonth = React.useCallback<CalendarContextProps['method']['isInMonth']>(
        (data) => {
            return data.year() === day.year() && data.month() === day.month();
        },
        [day]
    );

    const isSelectedDay = React.useCallback<CalendarContextProps['method']['isSelectedDay']>(
        (data) => {
            return data.date() === day.date() && isInMonth(data);
        },
        [day]
    );

    const store = React.useMemo<CalendarContextProps>(
        () => ({
            data: {
                today: defaultCalendarState.today,
                display,
                day,
                isOnlyMonth,
                openCalendarModal,
            },
            method: {
                setDisplay,
                setDay,
                setIsOnlyMonth,
                setOpenCalendarModal,
                isWeekend,
                isToday,
                isInMonth,
                isSelectedDay,
            },
        }),
        [display, day, isOnlyMonth, openCalendarModal]
    );

    return (
        <CalendarContext.Provider value={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                {children}
            </LocalizationProvider>
        </CalendarContext.Provider>
    );
}
