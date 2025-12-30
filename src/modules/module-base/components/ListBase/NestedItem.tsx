/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function NestedItem(props: App.ModuleBase.Component.NestedItemProps) {
    const { subIndex = 1, divide, loading, onClick, title, icon = '', className, subMenu } = props;

    const hasSub = (subMenu?.length || 0) > 0;
    const itemId = React.useId();
    const [open, setOpen] = React.useState(false);

    const toggleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        if (hasSub) {
            setOpen((prev) => !prev);
        }
        onClick?.(event);
    };

    const renderCollapseList = React.useMemo(() => {
        return (
            <List disablePadding>
                {subMenu?.map((value) => (
                    <NestedItem key={value.id} {...value} subIndex={subIndex + 1} />
                ))}
            </List>
        );
    }, [subMenu, subIndex]);

    return (
        <div key={itemId}>
            {divide?.includes('top') ? <Divider /> : null}
            <ListItemButton className={className} onClick={toggleOpen}>
                <ListItemIcon
                    className={clsx('mr-5 min-w-6', { 'text-tw-primary': open })}
                    sx={{
                        marginLeft: `${6 + (subIndex - 1) * 24}px`,
                    }}
                >
                    {icon}
                </ListItemIcon>
                {loading ? (
                    <CircularProgress size={20} />
                ) : (
                    <ListItemText primary={title} className={clsx({ 'text-tw-primary': open })} />
                )}
                {!hasSub ? null : open ? (
                    <ExpandLessIcon className="text-tw-primary ml-8" />
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
        </div>
    );
}
