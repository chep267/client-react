/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Dayjs } from 'dayjs';

export interface CalendarItemProps {
    day: Dayjs;
    isToday?: boolean;
    isInMonth?: boolean;
    isWeekend?: boolean;
    isOnlyMonth?: boolean;
    isSelectedDay?: boolean;
    onSelect(): void;
}

export type CalendarLabelProps = {
    day: number;
};
