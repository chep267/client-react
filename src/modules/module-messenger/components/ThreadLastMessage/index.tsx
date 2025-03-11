/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import { Skeleton, Stack, Typography } from '@mui/material';

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

/** components */
import EmojiMessage from '@module-messenger/components/Message/EmojiMessage';

/** utils */
import { Crypto } from '@module-base/utils/Crypto';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

/** styles */
import useStyles from './styles';

/** types */
import type { ReactNode } from 'react';
import type { TypeUser } from '@module-user/types';
import type { TypeDocumentThreadData } from '@module-messenger/types';

type ThreadLastMessageProps = { tid?: TypeUser['uid']; message: TypeDocumentThreadData['lastMessage'] };

export default function ThreadLastMessage(props: ThreadLastMessageProps) {
    const { tid, message } = props;
    const classes = useStyles();
    const AUTH = useAuth();
    const uid = AUTH.data.user?.uid as string;

    if (!tid || !message) {
        return <Skeleton width={100} />;
    }

    const sender =
        message.uid === uid ? (
            <Typography variant="body1">
                <FormattedMessage id={MessengerLanguage.component.label.message.you} />:
            </Typography>
        ) : undefined;

    let text: ReactNode;
    const numberFile = message.fileIds?.length;
    switch (true) {
        case message.type === 'emoji':
            text = <EmojiMessage fontSize="small" />;
            break;
        case numberFile > 0:
            text = (
                <Typography variant="body1">
                    <FormattedMessage id={MessengerLanguage.component.label.message.sent} />: &nbsp;
                    <FormattedMessage
                        id={MessengerLanguage.component.label.message.count.image[numberFile === 1 ? 'single' : 'multi']}
                        values={{ number: message.fileIds?.length }}
                    />
                </Typography>
            );
            break;
        default:
            text = <Typography variant="body1">{Crypto.decrypt(message.text)}</Typography>;
            break;
    }

    return (
        <Stack className={classes.message}>
            {sender}
            {text}
        </Stack>
    );
}
