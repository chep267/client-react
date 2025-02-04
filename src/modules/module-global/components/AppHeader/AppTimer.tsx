/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';

export default function AppTimer() {
    const hookLanguage = useLanguage();
    const { locale } = hookLanguage.data;

    return (
        <Box className="hidden items-center gap-2 md:flex dark:text-white">
            <Box className="h-2 w-2 rounded-full dark:!bg-white" bgcolor="primary.main" />
            <Typography variant="body2" fontWeight={400} textTransform="capitalize">
                {dayjs().locale(locale).format('dddd, DD/MM/YYYY')}
            </Typography>
            <Box className="h-2 w-2 rounded-full dark:!bg-white" bgcolor="primary.main" />
        </Box>
    );
}
