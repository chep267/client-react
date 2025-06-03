/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

/** utils */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

export default function ThreadTitle() {
    return (
        <Box className="w-full px-2 pt-3">
            <Typography variant="h5">
                <FormattedMessage id={MessengerLanguage.component.label.thread} />
            </Typography>
        </Box>
    );
}
