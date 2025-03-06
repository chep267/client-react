/**
 *
 * @author dongntd267@gmail.com on 24/08/2023.
 *
 */

import makeStyles from '@mui/styles/makeStyles';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';

/** types */
import type { TypeTheme } from '@module-theme/types';

const useStyles = makeStyles(({ palette, breakpoints, zIndex }: TypeTheme) => ({
    layoutDefault: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        borderRadius: 0,
        overflow: 'hidden',
    },
    left: {
        maxWidth: ScreenSize.Messenger.left.maxWidth,
        transition: 'all 0.3s ease-in-out, background-color 0s',
        [breakpoints.down('xl')]: {
            minWidth: ScreenSize.Messenger.left.mediumWidth,
            maxWidth: ScreenSize.Messenger.left.mediumWidth,
        },
        [breakpoints.down('md')]: {
            minWidth: ScreenSize.Messenger.left.minWidth,
            maxWidth: ScreenSize.Messenger.left.minWidth,
            '& div[class*=".ThreadTitle"], div[class*=".ThreadSearch"]': {
                position: 'absolute',
                zIndex: -1,
                visibility: 'hidden',
            },
            '& li[class*=".ThreadItem"]': {
                '& > div:last-of-type, button': {
                    visibility: 'hidden',
                    width: 0,
                },
            },
        },
        [breakpoints.down('sm')]: {
            minWidth: 0,
            maxWidth: 0,
        },
    },
    right: {
        borderLeft: `1px solid ${palette.divider}`,
        maxWidth: ScreenSize.Messenger.left.maxWidth,
        transition: 'all 0.3s ease-in-out, height 0s, background-color 0s',
        [breakpoints.down('xl')]: {
            minWidth: ScreenSize.Messenger.left.mediumWidth,
            maxWidth: ScreenSize.Messenger.left.mediumWidth,
        },
        [breakpoints.down('lg')]: {
            position: 'fixed',
            top: ScreenSize.HeaderHeight + ScreenSize.Messenger.center.titleHeight,
            right: 0,
            zIndex: zIndex.drawer,
            minWidth: ScreenSize.Messenger.left.mediumWidth,
            maxWidth: ScreenSize.Messenger.left.mediumWidth,
            maxHeight: `calc(100% - ${ScreenSize.HeaderHeight + ScreenSize.Messenger.center.titleHeight}px)`,
        },
    },
    center: {
        borderLeft: `1px solid ${palette.divider}`,
    },
    right_hidden: {
        minWidth: 0,
        maxWidth: 0,
        visibility: 'hidden',
        zIndex: -1,
        border: 'none',
    },
}));

export default useStyles;
