/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';

/** types */
import type { CalendarLabelProps } from '@module-calendar/types';

function Day(props: CalendarLabelProps) {
    const { day } = props;
    const hookLanguage = useLanguage();
    const {
        data: { locale },
    } = hookLanguage;

    return dayjs().day(day).locale(locale).format('ddd');
}

export default function CalendarLabel(props: CalendarLabelProps) {
    const { day } = props;

    return (
        <Typography className="m-auto w-fit" variant="h6" color={day === 0 || day === 6 ? 'error' : ''}>
            <Day day={day} />
        </Typography>
    );
}
