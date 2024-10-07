/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage } from 'react-intl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { useNotify } from '@module-base/hooks/useNotify';

/** types */
import type { SnackbarOrigin } from '@mui/material/Snackbar';
import type { NotifyBoundaryProps } from '@module-base/types';

/** styles */
const useStyles = makeStyles(({ palette }) => ({
    snackbar: {
        top: 70,
    },
    notify: {
        width: '100%',
    },
    default: {
        color: palette.common.white,
        backgroundColor: palette.primary.main,
    },
    hidden: {
        display: 'none',
    },
    title: {
        textTransform: 'capitalize',
    },
}));

const NotifyBoundary = React.memo<NotifyBoundaryProps>(function NotifyBoundary(props) {
    const NOTIFY = useNotify();
    const { open, message, messageIntl, mode, close, duration = AppTimer.notifyDuration } = NOTIFY.data;
    const classes = useStyles();

    const closeSnackbar = React.useCallback(() => NOTIFY.method.toggleNotify(), []);

    const anchorOrigin = React.useRef<SnackbarOrigin>({ vertical: 'top', horizontal: 'right' }).current;

    return (
        <Snackbar
            key="base-notify-boundary-app"
            className={classes.snackbar}
            autoHideDuration={duration}
            anchorOrigin={anchorOrigin}
            open={open}
            onClose={closeSnackbar}
            {...props}>
            <Alert
                className={classnames(classes.notify, { [classes.default]: !mode }, { [classes.hidden]: !open })}
                onClose={close ? closeSnackbar : undefined}
                severity={mode}
                elevation={6}
                variant="filled">
                <AlertTitle className={classes.title}>{mode}!</AlertTitle>
                {messageIntl ? <FormattedMessage id={messageIntl} /> : message}
            </Alert>
        </Snackbar>
    );
});

export default NotifyBoundary;
