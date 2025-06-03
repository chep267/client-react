/**
 *
 * @author dongntd267@gmail.com
 *
 */

import * as React from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

/** libs */
import { Stack, Tooltip } from '@mui/material';

/** components */
import OptionMessage from '@module-messenger/components/Message/OptionMessage';
import StatusMessage from '@module-messenger/components/Message/StatusMessage';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';
import { useAuth } from '@module-auth/hooks/useAuth';

/** styles */
import useStyles from './styles';

/** types */
import type { TypeDocumentMessageData } from '@module-messenger/types';

/** lazy components */
const EmojiMessage = React.lazy(() => import('./EmojiMessage'));
const TextMessage = React.lazy(() => import('./TextMessage'));
const ImageMessage = React.lazy(() => import('./ListImageMessage'));

type MessageProps = {
    data: TypeDocumentMessageData;
};

export default function Message(props: MessageProps) {
    const { data } = props;
    const classes = useStyles();
    const AUTH = useAuth();
    const LANGUAGE = useLanguage();
    const isMe = data.uid === AUTH.data.user?.uid;

    return (
        <Stack className={clsx(classes.message_view, { [classes.meView]: isMe }, { [classes.partnerView]: !isMe })}>
            <StatusMessage isMe={isMe} />
            {isMe ? <OptionMessage /> : null}
            <Tooltip
                title={dayjs(data.createdTime).locale(LANGUAGE.data.locale).format('hh:mm dddd, DD/MM/YYYY')}
                placement={isMe ? 'right-end' : 'left-end'}
            >
                <Stack className={clsx(classes.message, { [classes.meMessage]: isMe }, { [classes.partnerMessage]: !isMe })}>
                    <React.Suspense>
                        {data.type === 'emoji' ? <EmojiMessage /> : null}
                        {data.type === 'text' && data.text ? <TextMessage isMe={isMe} text={data.text} /> : null}
                        {data.fileIds.length > 0 ? <ImageMessage fileIds={data.fileIds} files={data.files} /> : null}
                    </React.Suspense>
                </Stack>
            </Tooltip>
            {!isMe ? <OptionMessage /> : null}
        </Stack>
    );
}
