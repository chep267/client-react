/**
 *
 * @author dongntd267@gmail.com on 24/08/2023.
 *
 */

import makeStyles from '@mui/styles/makeStyles';

/** constants */
import { ScreenSize } from '@module-global/constants';

const useStyles = makeStyles(({ spacing, palette }) => ({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: `${spacing(3)} ${spacing(2)}`,
        borderBottom: `1px solid ${palette.divider}`,
        height: ScreenSize.MESSENGER_CENTER_HeaderHeight,
        minHeight: ScreenSize.MESSENGER_CENTER_HeaderHeight,
        maxHeight: ScreenSize.MESSENGER_CENTER_HeaderHeight,
    },
    header_left: {
        width: '100%',
    },
    header_right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing(1),
    },
}));

export default useStyles;
