/**
 *
 * @author dongntd267@gmail.com
 *
 */

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(({ zIndex }: any) => ({
    menuPaper: {
        zIndex: zIndex.tooltip,
        '& .MuiPaper-root': {
            borderRadius: 10,
        },
    },
}));

export default useStyles;
