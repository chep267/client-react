/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Dispatch, SetStateAction } from 'react';

/** types */
import type { Dayjs } from 'dayjs';

export type { Dayjs };

export type TypeCalendarDisplay = 'sunday' | 'monday' | 'weekend';

export type CalendarContextProps = {
    data: {
        today: Dayjs;
        display: TypeCalendarDisplay;
        day: Dayjs;
        isOnlyMonth: boolean;
    };
    method: {
        setDisplay: Dispatch<SetStateAction<CalendarContextProps['data']['display']>>;
        setDay: Dispatch<SetStateAction<Dayjs>>;
        setIsOnlyMonth: Dispatch<SetStateAction<boolean>>;
        isWeekend: (day: Dayjs | number) => boolean;
        isToday: (day: Dayjs) => boolean;
        isInMonth: (day: Dayjs) => boolean;
        isSelectedDay: (day: Dayjs) => boolean;
    };
};

export type CalendarTableDataType = Record<number, Dayjs>;
