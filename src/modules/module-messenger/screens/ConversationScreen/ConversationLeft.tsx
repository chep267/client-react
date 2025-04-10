/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import clsx from 'clsx';
import Box from '@mui/material/Box';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** components */
import ThreadSearchProvider from '@module-messenger/components/ThreadSearchProvider';
import ThreadTitle from '@module-messenger/components/ThreadTitle';
import ThreadSearch from '@module-messenger/components/ThreadSearch';
import ThreadContent from '@module-messenger/components/ThreadContent';

export default function ConversationLeft() {
    return (
        <Box
            className={clsx(
                'relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-none border-r border-solid transition-[width]'
            )}
            sx={({ breakpoints }) => ({
                minWidth: 0,
                maxWidth: 0,
                borderColor: 'divider',
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
            <ThreadSearchProvider>
                <Box
                    className={clsx('flex w-full flex-col justify-between', 'max-lg:hidden')}
                    sx={{
                        height: ScreenSize.Messenger.left.titleHeight,
                        minHeight: ScreenSize.Messenger.left.titleHeight,
                        maxHeight: ScreenSize.Messenger.left.titleHeight,
                    }}
                >
                    <ThreadTitle />
                    <ThreadSearch />
                </Box>
                <ThreadContent />
            </ThreadSearchProvider>
        </Box>
    );
}
