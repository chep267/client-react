/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Mic as MicIcon } from '@mui/icons-material';

/** components */
import ButtonSendMessage from '@module-messenger/components/ConversationFooter/ButtonSendMessage';
import InputMessage from '@module-messenger/components/ConversationFooter/InputMessage';
import ButtonChooseFile from '@module-messenger/components/ConversationFooter/ButtonChooseFile';
import ListFiles from '@module-messenger/components/ConversationFooter/ListFiles';

export default function ConversationFooter() {
    return (
        <Box className="relative flex h-fit w-full items-center justify-between border-t p-2" borderColor="divider">
            <Box className="flex h-full w-28 items-center justify-start">
                <ButtonChooseFile />
                <IconButton color="primary" onClick={() => {}}>
                    <MicIcon />
                </IconButton>
            </Box>
            <Box className="flex h-full w-full">
                <ListFiles />
                <InputMessage />
            </Box>
            <Box className="flex h-full w-15 items-center justify-end">
                <ButtonSendMessage />
            </Box>
        </Box>
    );
}
