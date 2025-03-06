/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { Components, GroupedVirtuoso } from 'react-virtuoso';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';

/** constants */

/** components */

/** types */
import type { TableComponents } from 'react-virtuoso';
import { VirtualListProps, VirtualTableHeaderProps, VirtualTableProps } from '@module-base/types';
import type { ListProps } from '@mui/material/List';
import { Avatar, ListItemAvatar } from '@mui/material';

export default function VirtualList(props: VirtualListProps) {
    const { className } = props;

    const { users, groups, groupCounts } = React.useMemo(() => {
        const users = Array.from({ length: 500 }, (_, index) => ({
            name: `User ${index}`,
            initials: `U${index}`,
            description: `Description for user ${index}`,
        }));
        const groups = Array.from({ length: 10 }, (_, index) => `Group ${index}`);
        const groupCounts = groups.map((_, index) => {
            return users.filter((_, userIndex) => userIndex % 10 === index).length;
        });
        return { users, groups, groupCounts };
    }, []);

    const components = React.useMemo<Components>(
        () => ({
            List: React.forwardRef<any, ListProps>(({ style, children }, listRef) => {
                return (
                    <List className="m-0" style={{ ...style }} component="div" ref={listRef}>
                        {children}
                    </List>
                );
            }),
            Item: ({ children, ...props }) => {
                return (
                    <ListItem component="div" {...props} className="m-0">
                        {children}
                    </ListItem>
                );
            },
            Group: ({ children, style, ...props }) => {
                return (
                    <ListSubheader
                        className="m-0"
                        component="div"
                        {...props}
                        style={{
                            ...style,
                            backgroundColor: 'var(--ifm-color-content-inverse)',
                        }}
                    >
                        {children}
                    </ListSubheader>
                );
            },
        }),
        []
    );

    return (
        <GroupedVirtuoso
            className={className}
            components={components}
            groupCounts={groupCounts}
            groupContent={(index) => {
                return <div>{groups[index]}</div>;
            }}
            itemContent={(index) => {
                const user = users[index];
                return (
                    <>
                        <ListItemAvatar>
                            <Avatar>{user.initials}</Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={user.name} secondary={<span>{user.description}</span>} />
                    </>
                );
            }}
        />
    );
}
