/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/MessengerRouterPath';

/** utils */
import { validateId } from '@module-base/utils/validateId';
import { checkString } from '@module-base/utils/checkString';
import { genPath } from '@module-base/utils/genPath';

/** hooks */
import { useListUser } from '@module-user/hooks/useListUser';
import { useUiThreadSearch } from '@module-messenger/hooks/useUiThreadSearch';

/** components */
import VirtualList from '@module-base/components/VirtualList';
import ThreadAvatar from '@module-messenger/components/ThreadAvatar';
import ThreadName from '@module-messenger/components/ThreadName';

/** type */
import type { TypeUser } from '@module-user/types';

const ThreadListSearch = React.memo(function ThreadListSearch() {
    const LIST_USER = useListUser();
    const {
        data: { searchKey, isSearching },
    } = useUiThreadSearch();

    const { itemIds, items } = LIST_USER.data ?? {};

    const itemContent = (_index: number, uid: TypeUser['uid']) => {
        const user = items?.[uid];
        const isHidden = !user || !checkString(user.displayName || '', searchKey);
        const tid = validateId(uid, 'tid');

        return isHidden ? null : (
            <ListItem
                component={RouterLink}
                className={clsx('group/item h-20')}
                sx={{
                    '&:hover': {
                        backgroundColor: 'divider',
                    },
                }}
                to={genPath(MessengerRouterPath.messenger, MessengerRouterPath.conversation.replace(':tid', tid))}
            >
                <ListItemAvatar>
                    <ThreadAvatar tid={uid} src={user.photoURL || undefined} alt={user.displayName || undefined} />
                </ListItemAvatar>
                <ListItemText primary={<ThreadName tid={uid} name={user.displayName} />} />
            </ListItem>
        );
    };

    return (
        <VirtualList
            className="scrollbar-thin overflow-x-hidden"
            loading={isSearching}
            data={itemIds}
            itemContent={itemContent}
        />
    );
});

export default ThreadListSearch;
