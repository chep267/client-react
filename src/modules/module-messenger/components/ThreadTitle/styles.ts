/**
 *
 * @author dongntd267@gmail.com on 24/08/2023.
 *
 */

import makeStyles from '@mui/styles/makeStyles';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

const useStyles = makeStyles(({ spacing }) => ({
    thread_title: {
        width: '100%',
        justifyContent: 'flex-end',
        padding: `0px ${spacing(2)} 5px`,
        height: ScreenSize.MESSENGER_LEFT_HeaderHeight,
        minHeight: ScreenSize.MESSENGER_LEFT_HeaderHeight,
        maxHeight: ScreenSize.MESSENGER_LEFT_HeaderHeight,
    },
}));

export default useStyles;
