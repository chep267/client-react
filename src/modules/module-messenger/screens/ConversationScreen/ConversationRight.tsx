/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import classnames from 'classnames';

/** lib components */
import { Paper } from '@mui/material';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** components */
// import { ThreadInfo } from '@module-messenger/components';

export default function ConversationRight() {
    const { ui } = useMessenger();

    return (
        <Paper
            className={classnames(
                'flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-none bg-red-500 transition-[width]'
            )}
            sx={({ breakpoints, zIndex }) => ({
                maxWidth: ScreenSize.Messenger.left.mediumWidth,
                [breakpoints.down('lg')]: {
                    position: 'fixed',
                    top: ScreenSize.HeaderHeight + ScreenSize.Messenger.center.titleHeight,
                    right: 0,
                    bottom: 0,
                    zIndex: zIndex.drawer,
                    // maxHeight: `calc(100% - ${ScreenSize.HeaderHeight + ScreenSize.Messenger.center.titleHeight}px)`,
                },
                [breakpoints.up('xl')]: {
                    maxWidth: ScreenSize.Messenger.left.maxWidth,
                },
            })}
        >
            {/*<ThreadInfo />*/}
        </Paper>
    );
}
