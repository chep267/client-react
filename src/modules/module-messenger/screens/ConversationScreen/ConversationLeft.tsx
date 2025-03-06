/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import { Paper } from '@mui/material';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** components */
import { ThreadSearchProvider, ThreadTitle, ThreadSearch, ThreadContent } from '@module-messenger/components';

export default function ConversationLeft() {
    return (
        <Paper
            className={classnames(
                'relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-none transition-[width]'
            )}
            sx={({ breakpoints }) => ({
                minWidth: 0,
                maxWidth: 0,
                [breakpoints.up('sm')]: {
                    maxWidth: ScreenSize.Messenger.left.minWidth,
                },
                [breakpoints.up('lg')]: {
                    maxWidth: ScreenSize.Messenger.left.mediumWidth,
                },
                [breakpoints.up('xl')]: {
                    maxWidth: ScreenSize.Messenger.left.maxWidth,
                },
            })}
        >
            <ThreadTitle />
            <ThreadSearchProvider>
                <ThreadSearch />
                <ThreadContent />
            </ThreadSearchProvider>
        </Paper>
    );
}
