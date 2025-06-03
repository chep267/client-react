/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
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
        <Stack className={clsx(classes.textMessage)}>
            <Typography variant="body1">{Crypto.decrypt(text)}</Typography>
        </Stack>
    );
}
