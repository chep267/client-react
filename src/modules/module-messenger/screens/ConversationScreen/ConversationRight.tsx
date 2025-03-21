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
import { SiderState } from '@module-base/constants/SiderState';

/** hooks */
import { useSider } from '@module-base/hooks/useSider';
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** components */
import ThreadInfo from '@module-messenger/components/ThreadInfo';

export default function ConversationRight() {
    const hookSider = useSider();
    const hookMessenger = useMessenger();

    return (
        <Box
            className={classnames(
                'flex h-full flex-col items-center justify-between overflow-hidden rounded-none border-l border-solid transition-[width]',
                { ['w-full']: hookMessenger.ui.openThreadInfo },
                { ['w-0']: !hookMessenger.ui.openThreadInfo }
            )}
            sx={({ breakpoints, zIndex }) => ({
                maxWidth: ScreenSize.Messenger.left.mediumWidth,
                borderColor: 'divider',
                [breakpoints.down('lg')]: {
                    position: 'fixed',
                    top:
                        ScreenSize.HeaderHeight +
                        ScreenSize.Messenger.center.titleHeight +
                        (hookSider.data.siderState === SiderState.hidden ? ScreenSize.AppBarMiniHeight : 0),
                    right: 0,
                    bottom: 0,
                    zIndex: zIndex.drawer,
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
