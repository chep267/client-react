/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { alpha } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

/** constants */
import { localeObject } from '@module-language/constants/localeObject.ts';

/** utils */
import VietnameseDate from '@module-calendar/utils/Lunar';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage.ts';
import { useCalendar } from '@module-calendar/hooks/useCalendar.ts';

/** styles */
const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 32px)',
        height: '70vh',
        maxWidth: 600,
        maxHeight: 700,
        padding: 0,
        [breakpoints.up('md')]: {
            width: 600,
        },
        border: 'none',
        outline: 'none',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: 10,
            height: 10,
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: 6,
            background: alpha(palette.divider, 0.1),
        },
        '&::-webkit-scrollbar-thumb': {
            minHeight: 100,
            borderRadius: 6,
            background: alpha(palette.divider, 0.2),
        },
        '&:hover::-webkit-scrollbar-thumb': {
            background: alpha(palette.divider, 0.3),
        },
        '&::-webkit-scrollbar-thumb:active': {
            background: alpha(palette.divider, 0.4),
        },
    },
    cardHeader: {
        textAlign: 'right',
    },
    weekend: {
        color: palette.error.main,
    },
    solar: {
        display: 'flex',
        flex: 1,
        height: 'fit-content',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing(2),
        minHeight: 300,
    },
    solarItem: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lunar: {
        display: 'flex',
        padding: '0 !important',
        borderTop: `1px solid ${palette.divider}`,
    },
    lunarItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: spacing(1),
        gap: spacing(2),
    },
    lunarItemCenter: {
        borderLeft: `1px solid ${palette.divider}`,
        borderRight: `1px solid ${palette.divider}`,
    },
    mobileText: {
        textAlign: 'center',
        [breakpoints.down('md')]: {
            '& .MuiTypography-root': {
                fontSize: '1.5rem' /* 20px */,
                lineHeight: '1.75rem' /* 20px */,
            },
        },
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
    const lunarDay = new VietnameseDate(new Date(`${day.year()}-${day.month() + 1}-${day.date()}`));

    return (
        <Modal className={classes.modal} open={openCalendarModal} onClose={() => calendarMethod.setOpenCalendarModal(false)}>
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
                {/*     solar    */}
                <CardContent className={classes.solar}>
                    <Stack className={classnames(classes.solarItem, { [classes.weekend]: isWeekend })}>
                        <Typography variant="h1" fontSize="10rem">
                            {day.date()}
                        </Typography>
                    </Stack>
                    <Stack className={classnames({ [classes.weekend]: isWeekend })}>
                        <Typography variant="h5" textTransform="capitalize">
                            {day.locale(locale).format('dddd')}
                        </Typography>
                    </Stack>
                </CardContent>

                {/*     lunar    */}
                <CardContent className={classes.lunar}>
                    <Stack className={classnames(classes.lunarItem, classes.mobileText)}>
                        <Typography variant="h5">
                            <FormattedMessage id="module.calendar.text.day" />
                        </Typography>
                        <Typography variant="h2">{lunarDay.day}</Typography>
                        <Typography variant="h5">
                            {`${lunarDay.celestialStemOfDay} ${lunarDay.terrestrialBranchOfDay}`}
                        </Typography>
                    </Stack>
                    <Stack className={classnames(classes.lunarItem, classes.lunarItemCenter, classes.mobileText)}>
                        <Typography variant="h5">
                            <FormattedMessage id="module.calendar.text.month" />
                        </Typography>
                        <Typography variant="h2">{lunarDay.month}</Typography>
                        <Typography variant="h5">
                            {`${lunarDay.celestialStemOfMonth} ${lunarDay.terrestrialBranchOfMonth}`}
                        </Typography>
                    </Stack>
                    <Stack className={classnames(classes.lunarItem, classes.mobileText)}>
                        <Typography variant="h5">
                            <FormattedMessage id="module.calendar.text.year" />
                        </Typography>
                        <Typography variant="h2">{lunarDay.year}</Typography>
                        <Typography variant="h5">
                            {`${lunarDay.celestialStemOfYear} ${lunarDay.terrestrialBranchOfYear}`}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    );
}
