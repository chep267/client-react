/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Dispatch, SetStateAction } from 'react';

/** types */
import type { Dayjs } from 'dayjs';

export type TypeCalendarDisplay = 'sunday' | 'monday' | 'weekend';

export type CalendarContextProps = {
    data: {
        today: Dayjs;
        display: TypeCalendarDisplay;
        day: Dayjs;
        isOnlyMonth: boolean;
        openCalendarModal: boolean;
    };
    method: {
        setDisplay: Dispatch<SetStateAction<CalendarContextProps['data']['display']>>;
        setDay: Dispatch<SetStateAction<Dayjs>>;
        setIsOnlyMonth: Dispatch<SetStateAction<boolean>>;
        setOpenCalendarModal: Dispatch<SetStateAction<boolean>>;
        isWeekend: (day: Dayjs | number) => boolean;
        isToday: (day: Dayjs) => boolean;
        isInMonth: (day: Dayjs) => boolean;
        isSelectedDay: (day: Dayjs) => boolean;
    };
};

export type CalendarTableDataType = Record<number, Dayjs>;
