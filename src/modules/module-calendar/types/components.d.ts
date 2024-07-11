/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import { Dayjs } from '@module-calendar/types/data.d.ts';

export type CalendarTableProps = {
    selectDay?: (day: Dayjs) => void;
};

export type CalendarModalProps = {
    day?: Dayjs | undefined;
    onClose?(): void;
};

export type CalendarItemProps = {
    day: Dayjs;
    isHide?: boolean;
    isToday?: boolean;
    isInMonth?: boolean;
    isSelected?: boolean;
    onSelect(): void;
};

export type CalendarLabelProps = {
    day: number;
};
