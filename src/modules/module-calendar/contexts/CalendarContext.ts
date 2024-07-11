/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import dayjs from 'dayjs';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';

/** types */
import type { CalendarContextProps } from '@module-calendar/types';

export const defaultCalendarState = Object.freeze<CalendarContextProps['data']>({
    display: CalendarDisplay.sunday,
    today: dayjs(),
    day: dayjs(),
    isOnlyMonth: false,
});

export const CalendarContext = React.createContext<CalendarContextProps>({
    data: defaultCalendarState,
    method: {
        setDisplay: AppDefaultValue.emptyFunction,
        setDay: AppDefaultValue.emptyFunction,
        setIsOnlyMonth: AppDefaultValue.emptyFunction,
        isWeekend: () => false,
        isToday: () => false,
    },
});
