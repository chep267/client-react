/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Box from '@mui/material/Box';

/** hooks */
import { useUiThreadSearch } from '@module-messenger/hooks/useUiThreadSearch';

/** components */
import ThreadList from '@module-messenger/components/ThreadList';
import ThreadListSearch from '@module-messenger/components/ThreadListSearch';
import VirtualList from '@module-base/components/VirtualList';

export default function ThreadContent() {
    const {
        data: { isFocusSearch },
    } = useUiThreadSearch();

    return (
        <Box className={classnames('relative mt-2.5 flex h-full w-full overflow-hidden')}>
            <Box
                className={classnames(
                    'messenger-left-thread-list-default',
                    'absolute top-0 z-10 h-full w-full transition-all',
                    { 'right-0': !isFocusSearch },
                    { 'right-full': isFocusSearch }
                )}
            >
                {/*<ThreadList />*/}
                <VirtualList />
            </Box>
            <Box
                className={classnames(
                    'messenger-left-thread-list-search',
                    'absolute top-0 z-10 h-full w-full transition-all',
                    { 'left-full': !isFocusSearch },
                    { 'left-0': isFocusSearch }
                )}
            >
                <ThreadListSearch />
            </Box>
        </Box>
    );
}
