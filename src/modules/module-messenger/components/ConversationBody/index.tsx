/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

/** libs */
import { ListItem } from '@mui/material';

/** components */
import ListBase from '@module-base/components/ListBase';
import Message from '@module-messenger/components/Message';

/** hooks */
import { useListenListMessage } from '@module-messenger/hooks/useListenListMessage';

/** styles */
import useStyles from './styles';

export default function ConversationBody() {
    const classes = useStyles();
    const { tid = '' } = useParams();
    const LIST_MESSAGE = useListenListMessage({ tid });
    const listRef = React.useRef<any>(null);

    React.useEffect(() => {
        if (listRef.current) {
            setTimeout(() => {
                listRef.current?.scrollTop();
            }, 200);
        }
    }, [LIST_MESSAGE.isFetching, LIST_MESSAGE.data.itemIds]);

    const itemContent = React.useCallback(
        (mid: string) => {
            const message = LIST_MESSAGE.data.items[mid];
            return (
                <ListItem key={`${tid}-${mid}`} className={clsx(classes.listItem)}>
                    <Message data={message} />
                </ListItem>
            );
        },
        [LIST_MESSAGE.data.itemIds, tid]
    );

    return (
        <ListBase
            ref={listRef}
            className={clsx(classes.body, 'messenger_left_thread_list_default')}
            loading={LIST_MESSAGE.isFetching}
            data={LIST_MESSAGE.data.itemIds}
            itemContent={itemContent}
        />
    );
}
