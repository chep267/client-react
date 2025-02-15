/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import makeStyles from '@mui/styles/makeStyles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { themeObject } from '@module-theme/constants/themeObject';

/** styles */
const useStyles = makeStyles(({ palette, zIndex }: any) => {
    const color = palette.mode === themeObject.dark ? palette.warning.main : palette.primary.main;

    return {
        '@keyframes animate-LoadingElement': {
            '0%': {
                transform: 'rotate(45deg)',
            },
            '100%': {
                transform: 'rotate(405deg)',
            },
        },
        '@keyframes animate-startElement': {
            '0%': {
                transform: 'rotate(0deg)',
            },
            '100%': {
                transform: 'rotate(360deg)',
            },
        },

        screen: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: zIndex.modal,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: palette.background.default,
        },
        startElement: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 150,
            height: 150,
            backgroundColor: 'transparent',
            borderRadius: '50%',
            textShadow: `0 0 10px ${color}`,
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '3px solid transparent',
                borderTop: `3px solid ${color}`,
                borderRight: `3px solid ${color}`,
                animation: '$animate-startElement 2s linear infinite',
            },
        },
        textStart: {
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: color,
        },
        textLoading: {
            display: 'block',
            position: 'absolute',
            top: 'calc(50% - 2px)',
            left: '50%',
            width: '50%',
            height: 4,
            backgroundColor: 'transparent',
            transformOrigin: 'left',
            animation: '$animate-LoadingElement 2s linear infinite',

            '&:before': {
                content: '""',
                position: 'absolute',
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: color,
                top: -6,
                right: -8,
                boxShadow: `0 0 20px ${color}`,
            },
        },
    };
});

export default function StartLoading() {
    const classes = useStyles();

    return (
        <Stack className={classes.screen}>
            <Stack className={classes.startElement}>
                <Typography variant="h5" className={classes.textStart}>
                    <FormattedMessage id={BaseLanguage.component.label.start} />
                </Typography>
                <Typography className={classes.textLoading} />
            </Stack>
        </Stack>
    );
}
