/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import dayjs from 'dayjs';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay';

/** types */
import type { CalendarContextProps } from '@module-calendar/types';

export const defaultCalendarState: Readonly<CalendarContextProps['data']> = {
    display: CalendarDisplay.sunday,
    today: dayjs(),
    day: dayjs(),
    isOnlyMonth: false,
    openCalendarModal: false,
};

export const CalendarContext = React.createContext<CalendarContextProps>({
    data: defaultCalendarState,
    method: {
        setDisplay: AppDefaultValue.emptyFunction,
        setDay: AppDefaultValue.emptyFunction,
        setIsOnlyMonth: AppDefaultValue.emptyFunction,
        setOpenCalendarModal: AppDefaultValue.emptyFunction,
        isWeekend: () => false,
        isToday: () => true,
        isInMonth: () => true,
        isSelectedDay: () => true,
    },
});
