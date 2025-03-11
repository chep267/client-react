/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Box from '@mui/material/Box';

/** components */
import ConversationHeader from '@module-messenger/components/ConversationHeader';
import ConversationFooter from '@module-messenger/components/ConversationFooter';

export default function ConversationCenter() {
    return (
        <Box className={classnames('relative flex h-full w-full flex-col items-center justify-between overflow-hidden')}>
            <ConversationHeader />
            {/*<ConversationBody />*/}
            <ConversationFooter />
        </Box>
    );
}
