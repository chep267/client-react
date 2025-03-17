/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** utils */
import { Crypto } from '@module-base/utils/Crypto';

/** styles */
import useStyles from './styles';

type TextMessageProps = {
    isMe?: boolean;
    text?: string;
};

export default function TextMessage(props: TextMessageProps) {
    const { text } = props;
    const classes = useStyles();

    return (
        <Stack className={classnames(classes.textMessage)}>
            <Typography variant="body1">{Crypto.decrypt(text)}</Typography>
        </Stack>
    );
}
