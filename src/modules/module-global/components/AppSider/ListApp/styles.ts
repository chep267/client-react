/**
 *
 * @author dongntd267@gmail.com on 24/08/2023.
 *
 */

import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({ palette, spacing }) => ({
    listItem: {
        width: '100%',
        padding: spacing(1),
        '& .MuiListItemButton-root': {
            borderRadius: 8,
            minHeight: 50,
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
