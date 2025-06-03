/**
 *
 * @author dongntd267@gmail.com
 *
 */

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(({ spacing }: any) => ({
    body: {
        '& > ul': {
            scrollBehavior: 'smooth',
            padding: `${spacing(3)} ${spacing(2)}`,
        },
    },
    listItem: {
        width: '100%',
    },
}));

export default useStyles;
