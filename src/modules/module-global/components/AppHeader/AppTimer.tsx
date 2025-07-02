/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

function Timer() {
    const locale = useSettingStore((store) => store.data.locale);
    return dayjs().locale(locale).format('dddd, DD/MM/YYYY');
}

export default function AppTimer() {
    return (
        <Box className={clsx('items-center gap-2', 'hidden', 'md:flex')}>
            <Box className={clsx('bg-tw-primary h-2 w-2 rounded-full', 'dark:bg-white')} />
            <Typography variant="body2" fontWeight={400} textTransform="capitalize">
                <Timer />
            </Typography>
            <Box className={clsx('bg-tw-primary h-2 w-2 rounded-full', 'dark:bg-white')} />
        </Box>
    );
}
