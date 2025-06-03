/**
 *
 * @author dongntd267@gmail.com
 *
 */

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(({ zIndex }: any) => ({
    line: {
        position: 'fixed',
        width: 0,
        height: 0,
        borderRadius: 2,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: zIndex.tooltip,
        border: '1px solid red',
        transformOrigin: '0 100%',
        visibility: 'hidden',
    },
    lineShow: {
        top: 200,
        left: 200,
        visibility: 'visible',
        width: 64,
        height: 70,
    },
}));

export default useStyles;
