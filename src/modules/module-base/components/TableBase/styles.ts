/**
 *
 * @author dongntd267@gmail.com on 24/08/2023.
 *
 */

import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({ palette }) => ({
    tableBox: {
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    tableContainer: {
        borderRadius: 6,
        border: `2px solid ${palette.divider}`,
        maxWidth: '100%',
        maxHeight: '100%',
        '&::-webkit-scrollbar': {
            width: 10,
            height: 10,
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: 6,
            background: alpha(palette.divider, 0.1),
        },
        '&::-webkit-scrollbar-thumb': {
            minHeight: 100,
            borderRadius: 6,
            background: alpha(palette.divider, 0.2),
        },
        '&:hover::-webkit-scrollbar-thumb': {
            background: alpha(palette.divider, 0.3),
        },
        '&::-webkit-scrollbar-thumb:active': {
            background: alpha(palette.divider, 0.4),
        },
    },
    table: { minHeight: 200, height: '100%' },
    tableLoading: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        paddingTop: 80,
    },
    tableHead: {
        height: 60,
        '& th': { backgroundColor: palette.grey[palette.mode === 'light' ? 200 : 900] },
    },
    tableRow: {
        '& td': {
            fontSize: '1rem',
        },
    },
    tableRowHover: {
        cursor: 'pointer',
    },
}));
