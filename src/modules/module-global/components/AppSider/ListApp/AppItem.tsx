/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

/** types */
import type { AppItemProps } from '@module-global/types';

/** styles */

const AppItem = React.memo(function AppItem(props: AppItemProps) {
    const { isSelected, hasTooltip, item } = props;
    const itemSelectedStyle = React.useRef({
        '& .MuiListItemButton-root': {
            backgroundColor: 'primary.dark',
            '& .MuiListItemText-root, .MuiSvgIcon-root': {
                color: 'common.white',
            },
        },
    }).current;

    const renderItem = React.useMemo(() => {
        return (
            <ListItemButton onClick={item.onClick} className="!min-h-12 !rounded-lg !px-3 !py-0">
                <ListItemIcon className="min-w-10">{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} className="overflow-hidden text-nowrap text-ellipsis" />
            </ListItemButton>
        );
    }, [item]);

    return (
        <ListItem className="w-full !p-1" sx={isSelected ? itemSelectedStyle : undefined}>
            <Tooltip title={item.name} placement="right" disableHoverListener={!hasTooltip}>
                {renderItem}
            </Tooltip>
        </ListItem>
    );
});

export default AppItem;
