/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** lib */
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { IconButton, Tooltip } from '@mui/material';
import { Favorite as FavoriteIcon, Send as SendIcon } from '@mui/icons-material';

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

/** utils */
import { genMessage } from '@module-messenger/utils/genMessage';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';
import { useSendMessage } from '@module-messenger/hooks/useSendMessage';

export default function ButtonSendMessage() {
    const { tid = '' } = useParams();
    const hookSendMessage = useSendMessage();
    const { ui, method } = useMessenger();
    const draft = ui.drafts[tid];

    const onSendMessage = () => {
        hookSendMessage.mutate(
            { tid, draft },
            {
                onSuccess: () => {
                    method.setEmptyThread(tid);
                },
                onError: () => {
                    method.setEmptyThread(tid);
                },
            }
        );
    };

    const onSendEmoji = () => {
        hookSendMessage.mutate({ tid, draft: genMessage({ tid, type: 'emoji' }) });
    };

    const hasContent = Boolean(draft?.text || draft?.fileIds?.length);
    const idTooltip = hasContent
        ? MessengerLanguage.component.button.sendMessage
        : MessengerLanguage.component.button.sendEmoji;

    return (
        <Tooltip title={<FormattedMessage id={idTooltip} />}>
            <IconButton
                className="relative"
                disabled={hookSendMessage.isPending}
                onClick={hasContent ? onSendMessage : onSendEmoji}
            >
                <SendIcon
                    color="primary"
                    className={clsx('absolute z-1 transition-transform', {
                        ['visible scale-100']: hasContent,
                        ['invisible scale-0']: !hasContent,
                    })}
                />
                <FavoriteIcon
                    color="primary"
                    className={clsx('transition-transform', {
                        ['visible scale-100']: !hasContent,
                        ['invisible scale-0']: hasContent,
                    })}
                />
            </IconButton>
        </Tooltip>
    );
}
