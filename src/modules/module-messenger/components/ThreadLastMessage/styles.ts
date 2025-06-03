/**
 *
 * @author dongntd267@gmail.com
 *
 */

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    message: {
        flexDirection: 'row',
        gap: 4,
        '& > p:last-of-type': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        '& > svg': {
            marginTop: 2,
        },
    },
});

export default useStyles;
