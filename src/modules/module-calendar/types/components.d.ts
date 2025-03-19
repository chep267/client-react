/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Dayjs } from 'dayjs';

export declare interface CalendarItemProps {
    day: Dayjs;
    isToday?: boolean;
    isInMonth?: boolean;
    isWeekend?: boolean;
    isOnlyMonth?: boolean;
    isSelectedDay?: boolean;
    onSelect(): void;
}

export declare type CalendarLabelProps = {
    day: number;
};
