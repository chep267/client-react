/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

/** utils */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

export default function ThreadTitle() {
    return (
        <Stack className={classnames('.ThreadTitle', 'w-full p-2')}>
            <Typography variant="h5">
                <FormattedMessage id={MessengerLanguage.component.label.thread} />
            </Typography>
        </Stack>
    );
}
