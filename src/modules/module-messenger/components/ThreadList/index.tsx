/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/MessengerRouterPath';

/** utils */
import { genPath } from '@module-base/utils/genPath';

/** hooks */
import { useListenListThread } from '@module-messenger/hooks/useListenListThread';

/** components */
import VirtualList from '@module-base/components/VirtualList';
import ThreadItem from '@module-messenger/components/ThreadList/ThreadItem';

const ThreadList = React.memo(function ThreadList() {
    const navigate = useNavigate();
    const { tid: currentTid } = useParams();
    const hasTooltip = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const hookListenListThread = useListenListThread();

    const firstId = hookListenListThread.data.itemIds[0];

    React.useEffect(() => {
        if (firstId && (!currentTid || currentTid === '0')) {
            navigate(genPath(MessengerRouterPath.messenger, MessengerRouterPath.conversation.replace(':tid', firstId)));
        }
    }, [currentTid, firstId]);

    const itemContent = (_index: number, tid: string) => {
        const item = hookListenListThread.data?.items?.[tid];
        if (!item) {
            return null;
        }
        return <ThreadItem key={item.tid} item={item} isSelected={item.tid === currentTid} hasTooltip={hasTooltip} />;
    };

    return (
        <VirtualList
            className="scrollbar-thin overflow-x-hidden"
            loading={hookListenListThread.isFetching}
            data={hookListenListThread.data.itemIds}
            itemContent={itemContent}
        />
    );
});

export default ThreadList;
