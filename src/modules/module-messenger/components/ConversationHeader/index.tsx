/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Call as CallIcon, Videocam as VideoCallIcon } from '@mui/icons-material';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';

/** components */
import ConversationName from './ConversationName';
import IconThreadInfo from './IconThreadInfo';

export default function ConversationHeader() {
    return (
        <Box
            className="flex w-full items-center justify-between border-b px-2 py-3"
            borderColor="divider"
            sx={{
                height: AppScreenSize.Messenger.center.titleHeight,
                minHeight: AppScreenSize.Messenger.center.titleHeight,
                maxHeight: AppScreenSize.Messenger.center.titleHeight,
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
