/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
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

const NotifyBoundary = React.memo<App.ModuleBase.Component.NotifyProviderProps>(function NotifyBoundary(props) {
    const hookNotify = useNotify();
    const { open, message, messageIntl, color, duration = AppTimer.notifyDuration, top = 70 } = hookNotify.data;

    const anchorOrigin = React.useRef<SnackbarOrigin>({ vertical: 'top', horizontal: 'right' }).current;

    return (
        <Snackbar
            key="base-notify-boundary-app"
            open={open}
            style={{ top }}
            autoHideDuration={duration}
            anchorOrigin={anchorOrigin}
            onClose={hookNotify.method.closeNotify}
            {...props}
        >
            <Alert
                className={clsx('w-full', { ['hidden']: !open })}
                onClose={hookNotify.method.closeNotify}
                severity={color}
                elevation={6}
                variant="filled"
            >
                <AlertTitle className="capitalize">{color}!</AlertTitle>
                {messageIntl ? <FormattedMessage id={messageIntl} /> : message}
            </Alert>
        </Snackbar>
    );
});

export default NotifyBoundary;
