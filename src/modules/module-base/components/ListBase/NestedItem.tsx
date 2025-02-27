/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/** types */
import type { SxProps, Theme } from '@mui/material/styles';
import type { ElementClickEvent, NestedItemProps } from '@module-base/types';

export default function NestedItem(props: NestedItemProps) {
    const { subIndex = 1, divide, loading, onClick, title, icon = ' ', subMenu } = props;

    const hasSub = (subMenu?.length || 0) > 0;
    const [open, setOpen] = React.useState(false);

    const toggleOpen = React.useCallback((event: ElementClickEvent<HTMLDivElement>) => {
        if (!hasSub) {
            return onClick?.(event);
        }
        return setOpen((prev) => {
            onClick?.(event, !prev);
            return !prev;
        });
    }, []);

    const styleIcon = React.useMemo<SxProps<Theme>>(
        () => ({
            '.MuiSvgIcon-root': {
                color: open ? 'primary.main' : undefined,
            },
            marginLeft: `${6 + (subIndex - 1) * 24}px`,
        }),
        [subIndex, open]
    );

    const renderCollapseList = React.useMemo(() => {
        return (
            <List component="div" disablePadding>
                {subMenu?.map((value) => <NestedItem key={value.id} {...value} subIndex={subIndex + 1} />)}
            </List>
        );
    }, [subMenu]);

    return (
        <>
            {divide?.includes('top') ? <Divider /> : null}
            <ListItemButton onClick={toggleOpen}>
                <ListItemIcon className="mr-5 min-w-6" sx={styleIcon}>
                    {icon}
                </ListItemIcon>
                {loading ? (
                    <CircularProgress size={20} />
                ) : (
                    <ListItemText primary={title} slotProps={{ primary: { color: open ? 'primary' : undefined } }} />
                )}
                {!hasSub ? null : open ? (
                    <ExpandLessIcon className="ml-8" color="primary" />
                ) : (
                    <ExpandMoreIcon className="ml-8" />
                )}
            </ListItemButton>
            {hasSub ? (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {renderCollapseList}
                </Collapse>
            ) : null}
            {divide?.includes('bottom') ? <Divider /> : null}
        </>
    );
}
