/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const AppItem = React.memo<App.ModuleGlobal.Component.AppItemProps>(function AppItem(props) {
    const { isSelected, hasTooltip, item } = props;

    const itemContent = React.useMemo(() => {
        return (
            <ListItemButton onClick={item.onClick} className="min-h-12 rounded-lg px-3 py-0">
                <ListItemIcon className="min-w-10">{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} className="overflow-hidden text-nowrap text-ellipsis" />
            </ListItemButton>
        );
    }, [item]);

    return (
        <ListItem
            className={clsx('w-full p-1', {
                '[&_.MuiListItemButton-root]:bg-tw-primary [&_.MuiListItemButton-root]:*:text-white': isSelected,
            })}
        >
            <Tooltip title={item.name} placement="right" arrow disableHoverListener={!hasTooltip}>
                {itemContent}
            </Tooltip>
        </ListItem>
    );
});

export default AppItem;
