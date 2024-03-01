/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import dayjs from 'dayjs';

/** lib components */
import { Box, Typography } from '@mui/material';

/** hooks */
import { useLanguage } from '@module-language/hooks';

function TimeToday() {
    const {
        data: { locale },
    } = useLanguage();

    return (
        <Typography variant="body2" fontWeight={600} textTransform="capitalize">
            {dayjs().locale(locale).format('dddd, DD/MM/YYYY')}
        </Typography>
    );
}

export default function AppTimer() {
    return (
        <Box className="flex items-center gap-2 invisible md:visible">
            <Box className="w-2 h-2 rounded-full" bgcolor="primary.main" />
            <TimeToday />
        </Box>
    );
}
