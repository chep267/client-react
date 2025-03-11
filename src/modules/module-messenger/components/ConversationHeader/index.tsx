/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Call as CallIcon, Videocam as VideoCallIcon } from '@mui/icons-material';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** components */
import ConversationName from './ConversationName';
import IconThreadInfo from './IconThreadInfo';

export default function ConversationHeader() {
    return (
        <Box
            className="flex w-full items-center justify-between border-b px-2 py-3"
            borderColor="divider"
            sx={{
                height: ScreenSize.Messenger.center.titleHeight,
                minHeight: ScreenSize.Messenger.center.titleHeight,
                maxHeight: ScreenSize.Messenger.center.titleHeight,
            }}
        >
            <ConversationName />
            <Box className="flex items-center justify-between gap-1">
                <IconButton>
                    <CallIcon color="primary" />
                </IconButton>
                <IconButton>
                    <VideoCallIcon color="primary" />
                </IconButton>
                <IconThreadInfo />
            </Box>
        </Box>
    );
}
