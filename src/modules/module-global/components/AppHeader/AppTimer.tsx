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
import { useLanguage } from '@module-language/hooks/useLanguage.ts';

export default function AppTimer() {
    const {
        data: { locale },
    } = useLanguage();

    return (
        <Box className="items-center gap-2 hidden md:flex">
            <Box className="w-2 h-2 rounded-full" bgcolor="primary.main" />
            <Typography variant="body2" fontWeight={600} textTransform="capitalize">
                {dayjs().locale(locale).format('dddd, DD/MM/YYYY')}
            </Typography>
        </Box>
    );
}
