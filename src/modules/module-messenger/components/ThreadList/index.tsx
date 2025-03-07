/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, ListItemAvatar, useMediaQuery } from '@mui/material';

/** components */
import ListBase from '@module-base/components/ListBase';
import ThreadItem from '@module-messenger/components/ThreadList/ThreadItem';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/MessengerRouterPath';

/** utils */
import { genPath } from '@module-base/utils';

/** hooks */
import { useListenListThread } from '@module-messenger/hooks/useListenListThread';

/** types */
import type { Theme } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import VirtualList from '@module-base/components/VirtualList';
import type { VirtualListProps } from '@module-base/types';

const ThreadList = React.memo(function ThreadList() {
    const navigate = useNavigate();
    const { tid: currentTid } = useParams();
    const hasTooltip = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
    const LIST_THREAD = useListenListThread();

    const firstId = LIST_THREAD.data.itemIds[0];

    React.useEffect(() => {
        if (firstId && (!currentTid || currentTid === '0')) {
            // navigate(genPath(MessengerRouterPath.messenger, ScreenPath.MESSENGER_CONVERSATION.replace(':tid', firstId)));
        }
    }, [currentTid, firstId]);

    const onClickItem = React.useCallback((tid: string) => {
        // navigate(genPath(MessengerRouterPath.messenger, ScreenPath.MESSENGER_CONVERSATION.replace(':tid', tid)));
    }, []);

    const renderItem = (tid: string) => {
        const item = LIST_THREAD.data?.items?.[tid];
        return (
            <ThreadItem
                key={item.tid}
                item={item}
                isSelected={item.tid === currentTid}
                hasTooltip={hasTooltip}
                onClick={() => onClickItem(item.tid)}
            />
        );
    };

    // return <ListBase loading={LIST_THREAD.isFetching} data={LIST_THREAD.data.itemIds} renderItem={renderItem} />;

    const users = React.useMemo<
        VirtualListProps<{
            id: string;
            name: string;
            initials: string;
            description: string;
        }>['data']
    >(() => {
        return Array.from({ length: 100000 }, (_, index) => ({
            id: '',
            name: `User ${index}`,
            initials: `U${index}`,
            description: `Description for user ${index}`,
        }));
    }, []);

    return (
        <VirtualList
            data={users}
            slotProps={{
                listItem: {
                    // className: 'p-0 m-0',
                },
            }}
            itemContent={(_, user) => (
                <>
                    <ListItemAvatar>
                        <Avatar>{user.initials}</Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={user.name} secondary={<span>{user.description}</span>} />
                </>
            )}
        />
    );
});

export default ThreadList;
