/**
 *
 * @author dongntd267@gmail.com
 *
 */

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(({ spacing, palette }: any) => ({
    textMessage: {
        width: 'auto',
        padding: `5px ${spacing(2)}`,
        border: `1px solid ${palette.divider}`,
        borderRadius: 20,
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
    },
}));

export default useStyles;
