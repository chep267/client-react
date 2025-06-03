/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import Box from '@mui/material/Box';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

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
            className={clsx(
                'flex h-full flex-col items-center justify-between overflow-hidden rounded-none border-l border-solid transition-[width]',
                { ['w-full']: hookMessenger.ui.openThreadInfo },
                { ['w-0']: !hookMessenger.ui.openThreadInfo }
            )}
            sx={({ breakpoints, zIndex }) => ({
                maxWidth: AppScreenSize.Messenger.left.mediumWidth,
                borderColor: 'divider',
                [breakpoints.down('lg')]: {
                    position: 'fixed',
                    top:
                        AppScreenSize.HeaderHeight +
                        AppScreenSize.Messenger.center.titleHeight +
                        (hookSider.data.siderState === AppSiderState.hidden ? AppScreenSize.AppBarMiniHeight : 0),
                    right: 0,
                    bottom: 0,
                    zIndex: zIndex.drawer,
                    maxHeight: `calc(100% - ${AppScreenSize.HeaderHeight + AppScreenSize.Messenger.center.titleHeight}px)`,
                    backgroundColor: 'background.paper',
                },
                [breakpoints.up('xl')]: {
                    maxWidth: AppScreenSize.Messenger.left.maxWidth,
                },
            })}
        >
            <ThreadInfo />
        </Box>
    );
}
