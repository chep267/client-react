/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import Box from '@mui/material/Box';

/** components */
import ConversationHeader from '@module-messenger/components/ConversationHeader';
import ConversationFooter from '@module-messenger/components/ConversationFooter';

export default function ConversationCenter() {
    return (
        <Box className={clsx('relative flex h-full w-full flex-col items-center justify-between overflow-hidden')}>
            <ConversationHeader />
            {/*<ConversationBody />*/}
            <ConversationFooter />
        </Box>
    );
}
