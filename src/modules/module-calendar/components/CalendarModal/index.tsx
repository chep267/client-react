/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

/** constants */
import { localeObject } from '@module-language/constants/localeObject.ts';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage.ts';
import { useCalendar } from '@module-calendar/hooks/useCalendar.ts';

/** styles */
const useStyles = makeStyles(({ palette }) => ({
    card: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
    },
    cardHeader: {
        textAlign: 'right',
    },
    weekend: {
        color: palette.error.main,
    },
}));
export default function CalendarModal() {
    const {
        data: { locale },
    } = useLanguage();
    const {
        data: { day, openCalendarModal },
        method: calendarMethod,
    } = useCalendar();
    const classes = useStyles();

    const isWeekend = calendarMethod.isWeekend(day);

    return (
        <Modal open={openCalendarModal} onClose={() => calendarMethod.setOpenCalendarModal(false)}>
            <Card className={classnames(classes.card)}>
                <CardHeader
                    className={classnames(classes.cardHeader, { [classes.weekend]: isWeekend })}
                    title={
                        <FormattedMessage
                            id="module.calendar.component.calendar.title.text"
                            values={{
                                month: day.format(locale === localeObject.en ? 'MMMM' : 'MM'),
                                year: day.format('YYYY'),
                            }}
                        />
                    }
                />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        aaaaaaaaaaaaaaaa
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardContent></CardContent>
            </Card>
        </Modal>
    );
}
