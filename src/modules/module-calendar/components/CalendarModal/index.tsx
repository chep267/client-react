/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

/** constants */
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** utils */
import VietnameseDate from '@module-calendar/utils/Lunar';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';
import { useCalendar } from '@module-calendar/hooks/useCalendar';

export default function CalendarModal() {
    const hookLanguage = useLanguage();
    const hookCalendar = useCalendar();

    const { locale } = hookLanguage.data;
    const { day, openCalendarModal } = hookCalendar.data;
    const isWeekend = hookCalendar.method.isWeekend(day);
    const lunarDay = new VietnameseDate(new Date(`${day.year()}-${day.month() + 1}-${day.date()}`));

    return (
        <Modal open={openCalendarModal} onClose={() => hookCalendar.method.setOpenCalendarModal(false)}>
            <Card className="scrollbar-custom absolute top-1/2 left-1/2 flex w-11/12 max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between overflow-auto border-0 p-0 outline-0">
                <CardHeader
                    className={classnames('text-right')}
                    title={
                        <Typography color={isWeekend ? 'error' : ''} className="line-clamp-2 capitalize">
                            <FormattedMessage
                                id={CalendarLanguage.component.label.calendarInfo.title}
                                values={{
                                    month: day.locale(locale).format('MMMM'),
                                    year: day.locale(locale).format('YYYY'),
                                }}
                            />
                        </Typography>
                    }
                />
                {/*     solar    */}
                <CardContent className="flex h-fit min-h-72 flex-1 flex-col items-center justify-between gap-2">
                    <Stack className="flex-1 items-center justify-center">
                        <Typography variant="h1" fontSize="10rem" color={isWeekend ? 'error' : ''}>
                            {day.date()}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography variant="h5" textTransform="capitalize" color={isWeekend ? 'error' : ''}>
                            {day.locale(locale).format('dddd')}
                        </Typography>
                    </Stack>
                </CardContent>

                {/*     lunar    */}
                <CardContent className="flex p-0" sx={{ borderTop: ({ palette }) => `1px solid ${palette.divider}` }}>
                    <Stack className="flex-1 items-center gap-2 p-1 text-center">
                        <Typography variant="h5">
                            <FormattedMessage id={CalendarLanguage.component.label.day} />
                        </Typography>
                        <Typography variant="h2">{lunarDay.day}</Typography>
                        <Typography variant="h5">
                            {`${lunarDay.celestialStemOfDay} ${lunarDay.terrestrialBranchOfDay}`}
                        </Typography>
                    </Stack>
                    <Stack
                        className="flex-1 items-center gap-2 p-1 text-center"
                        sx={{
                            borderLeft: ({ palette }) => `1px solid ${palette.divider}`,
                            borderRight: ({ palette }) => `1px solid ${palette.divider}`,
                        }}
                    >
                        <Typography variant="h5">
                            <FormattedMessage id={CalendarLanguage.component.label.month} />
                        </Typography>
                        <Typography variant="h2">{lunarDay.month}</Typography>
                        <Typography variant="h5">
                            {`${lunarDay.celestialStemOfMonth} ${lunarDay.terrestrialBranchOfMonth}`}
                        </Typography>
                    </Stack>
                    <Stack className="flex-1 items-center gap-2 p-1 text-center">
                        <Typography variant="h5">
                            <FormattedMessage id={CalendarLanguage.component.label.year} />
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
