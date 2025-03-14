/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';

function Timer() {
    const hookLanguage = useLanguage();
    const { locale } = hookLanguage.data;
    return dayjs().locale(locale).format('dddd, DD/MM/YYYY');
}

export default function AppTimer() {
    return (
        <Box className={classnames('items-center gap-2', 'hidden', 'md:flex')}>
            <Box className={classnames('h-2 w-2 rounded-full', 'dark:bg-white')} bgcolor="primary.main" />
            <Typography variant="body2" fontWeight={400} textTransform="capitalize">
                <Timer />
            </Typography>
            <Box className={classnames('h-2 w-2 rounded-full', 'dark:bg-white')} bgcolor="primary.main" />
        </Box>
    );
}
