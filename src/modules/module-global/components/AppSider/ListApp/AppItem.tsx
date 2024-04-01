/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import classnames from 'classnames';

/** lib components */
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

/** styles */
import { useStyles } from './styles';

/** types */
import type { AppItemProps } from '@module-global/models';

const AppItem = React.memo(function AppItem(props: AppItemProps) {
    const { isSelected, isTooltip, item } = props;
    const classes = useStyles();

    const renderItem = React.useMemo(() => {
        return (
            <ListItemButton onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItemButton>
        );
    }, [item]);

    return (
        <ListItem className={classnames(classes.listItem, { [classes.listItemSelected]: isSelected })}>
            <Tooltip title={item.name} placement="right" disableHoverListener={!isTooltip}>
                {renderItem}
            </Tooltip>
        </ListItem>
    );
});

export default AppItem;
