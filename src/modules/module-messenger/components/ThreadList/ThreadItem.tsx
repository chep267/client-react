/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/MessengerRouterPath';

/** utils */
import { genPath } from '@module-base/utils/genPath';

/** components */
import ThreadAvatar from '@module-messenger/components/ThreadAvatar';
import ThreadName from '@module-messenger/components/ThreadName';
import ThreadLastMessage from '@module-messenger/components/ThreadLastMessage';

/** types */
import type { TypeDocumentThreadData } from '@module-messenger/types';

type ThreadItemProps = { item: TypeDocumentThreadData; isSelected: boolean; hasTooltip?: boolean };

const ThreadItem = React.memo(function ThreadItem(props: ThreadItemProps) {
    const { item, isSelected, hasTooltip } = props;

    const stopPropagation = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const renderName = React.useMemo(() => {
        return <ThreadName tid={item.tid} variant="h6" />;
    }, [item.tid]);

    return (
        <Tooltip title={renderName} placement="right" disableHoverListener={!hasTooltip}>
            <ListItem
                component={RouterLink}
                className={clsx('group/item h-20')}
                sx={{
                    backgroundColor: isSelected ? 'divider' : undefined,
                    '&:hover': {
                        backgroundColor: 'divider',
                    },
                }}
                to={genPath(MessengerRouterPath.messenger, MessengerRouterPath.conversation.replace(':tid', item.tid))}
            >
                <ListItemAvatar>
                    <ThreadAvatar tid={item.tid} />
                </ListItemAvatar>
                <ListItemText
                    primary={renderName}
                    secondary={<ThreadLastMessage tid={item.tid} message={item.lastMessage} />}
                    slotProps={{
                        primary: {
                            color: isSelected ? 'primary.dark' : '',
                            fontWeight: isSelected ? 'bold' : 'normal',
                        },
                        secondary: {
                            component: 'div',
                        },
                    }}
                />
                <IconButton className="hidden group-hover/item:flex" color="primary" onClick={stopPropagation}>
                    <MoreHorizIcon />
                </IconButton>
            </ListItem>
        </Tooltip>
    );
});

export default ThreadItem;
