/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import Box from '@mui/material/Box';

/** components */
import ConversationLeft from './ConversationLeft';
import ConversationCenter from './ConversationCenter';
import ConversationRight from './ConversationRight';

export default function ConversationScreen() {
    return (
        <Box className="relative flex h-full w-full">
            <ConversationLeft />
            <ConversationCenter />
            <ConversationRight />
        </Box>
    );
}
