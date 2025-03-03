/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';

/** types */
import type { CalendarLabelProps } from '@module-calendar/types';

export default function CalendarLabel(props: CalendarLabelProps) {
    const { day } = props;
    const {
        data: { locale },
    } = useLanguage();

    return (
        <Typography className="m-auto w-fit" variant="h6" color={day === 0 || day === 6 ? 'error.main' : ''}>
            {dayjs().day(day).locale(locale).format('ddd')}
        </Typography>
    );
}
