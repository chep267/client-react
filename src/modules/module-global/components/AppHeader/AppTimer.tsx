/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';

function Timer() {
    const hookLanguage = useLanguage();
    const { locale } = hookLanguage.data;
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
