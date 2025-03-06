/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import classnames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

/** components */
import ListBase from '@module-base/components/ListBase';
import ThreadItem from '@module-messenger/components/ThreadList/ThreadItem';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/MessengerRouterPath';

/** utils */
import { genPath } from '@module-base/utils';

/** hooks */
import { useListenListThread } from '@module-messenger/hooks/useListenListThread';

/** styles */
import useStyles from './styles';

/** types */
import type { Theme } from '@mui/material';

const ThreadList = React.memo(() => {
    const navigate = useNavigate();
    const { tid: currentTid } = useParams();
    const classes = useStyles();
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

    return <ListBase loading={LIST_THREAD.isFetching} data={LIST_THREAD.data.itemIds} renderItem={renderItem} />;
});

export default ThreadList;
