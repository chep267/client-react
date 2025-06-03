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
                    maxWidth: AppScreenSize.Messenger.left.minWidth,
                },
                [breakpoints.up('lg')]: {
                    maxWidth: AppScreenSize.Messenger.left.mediumWidth,
                },
                [breakpoints.up('xl')]: {
                    maxWidth: AppScreenSize.Messenger.left.maxWidth,
                },
            })}
        >
            <ThreadSearchProvider>
                <Box
                    className={clsx('flex w-full flex-col justify-between', 'max-lg:hidden')}
                    sx={{
                        height: AppScreenSize.Messenger.left.titleHeight,
                        minHeight: AppScreenSize.Messenger.left.titleHeight,
                        maxHeight: AppScreenSize.Messenger.left.titleHeight,
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
