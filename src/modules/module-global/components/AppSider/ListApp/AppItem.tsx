/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

/** types */
import type { AppItemProps } from '@module-global/models';
import makeStyles from '@mui/styles/makeStyles';

/** styles */
const useStyles = makeStyles(({ palette }) => ({
    listItem: {
        '& .MuiListItemButton-root': {
            borderRadius: 8,
            minHeight: 50,
            padding: '0 12px',
        },
        '& .MuiListItemText-root > .MuiListItemText-primary': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    },
    listItemSelected: {
        '& .MuiListItemButton-root': {
            backgroundColor: palette.primary.dark,
            '& .MuiListItemText-root, .MuiSvgIcon-root': {
                color: palette.common.white,
            },
        },
    },
}));

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
        <ListItem className={classnames('w-full p-1', classes.listItem, { [classes.listItemSelected]: isSelected })}>
            <Tooltip title={item.name} placement="right" disableHoverListener={!isTooltip}>
                {renderItem}
            </Tooltip>
        </ListItem>
    );
});

export default AppItem;
