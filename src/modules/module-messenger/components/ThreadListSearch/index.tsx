/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

/** lib components */
import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';

/** components */
import ListBase from '@module-base/components/ListBase';
import ThreadAvatar from '@module-messenger/components/ThreadAvatar';
import ThreadName from '@module-messenger/components/ThreadName';

/** constants */
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';

/** utils */
import { validateId } from '@module-base/utils/validateId';
import { checkString } from '@module-base/utils/checkString';

/** hooks */
import { useListUser } from '@module-user/hooks/useListUser';
import { useUiThreadSearch } from '@module-messenger/hooks/useUiThreadSearch';

/** styles */
import useStyles from '@module-messenger/components/ThreadList/styles';

/** type */
import type { TypeUser } from '@module-user/types';

const ThreadListSearch = React.memo(function ThreadListSearch() {
    const navigate = useNavigate();
    const classes = useStyles();
    const LIST_USER = useListUser();
    const {
        data: { searchKey, isSearching },
    } = useUiThreadSearch();

    const { itemIds, items } = LIST_USER.data ?? {};

    const onClickItem = React.useCallback((uid: TypeUser['uid']) => {
        const tid = validateId(uid, 'tid');
        // navigate(genPath(GlobalRouterPath.MESSENGER, GlobalRouterPath.MESSENGER_CONVERSATION.replace(':tid', tid)));
    }, []);

    const renderItem = React.useCallback(
        (uid: TypeUser['uid']) => {
            const user = items?.[uid];
            const isHidden = !user || !checkString(user.displayName || '', searchKey);

            return isHidden ? null : (
                <ListItem key={uid} className={classnames('.ThreadItem', classes.listItem)} onClick={() => onClickItem(uid)}>
                    <ListItemAvatar>
                        <ThreadAvatar tid={uid} src={user.photoURL || undefined} alt={user.displayName || undefined} />
                    </ListItemAvatar>
                    <ListItemText primary={<ThreadName tid={uid} name={user.displayName} />} />
                </ListItem>
            );
        },
        [items, searchKey]
    );

    return <ListBase loading={LIST_USER.isLoading || isSearching} data={itemIds} renderItem={renderItem} />;
});

export default ThreadListSearch;
