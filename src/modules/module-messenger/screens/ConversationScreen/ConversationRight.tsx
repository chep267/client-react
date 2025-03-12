/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Box from '@mui/material/Box';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** components */
import ThreadInfo from '@module-messenger/components/ThreadInfo';

export default function ConversationRight() {
    const hookMessenger = useMessenger();

    return (
        <Box
            className={classnames(
                'flex h-full flex-col items-center justify-between overflow-hidden rounded-none border-l border-solid transition-[width]',
                { ['w-full']: hookMessenger.ui.openThreadInfo },
                { ['w-0']: !hookMessenger.ui.openThreadInfo }
            )}
            sx={({ breakpoints, zIndex, palette }) => ({
                maxWidth: ScreenSize.Messenger.left.mediumWidth,
                borderColor: palette.divider,
                [breakpoints.down('lg')]: {
                    position: 'fixed',
                    top: ScreenSize.HeaderHeight + ScreenSize.Messenger.center.titleHeight,
                    right: 0,
                    bottom: 0,
                    zIndex: zIndex.drawer,
                    borderWidth: 1,
                    maxHeight: `calc(100% - ${ScreenSize.HeaderHeight + ScreenSize.Messenger.center.titleHeight}px)`,
                    backgroundColor: 'background.paper',
                },
                [breakpoints.up('xl')]: {
                    maxWidth: ScreenSize.Messenger.left.maxWidth,
                },
            })}
        >
            <ThreadInfo />
        </Box>
    );
}
