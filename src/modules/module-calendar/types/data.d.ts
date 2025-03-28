/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Dispatch, SetStateAction } from 'react';

/** types */
import type { Dayjs } from 'dayjs';

export declare type TypeCalendarDisplay = 'sunday' | 'monday' | 'weekend';

export declare type CalendarContextProps = {
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

export declare type CalendarTableDataType = Record<number, Dayjs>;
