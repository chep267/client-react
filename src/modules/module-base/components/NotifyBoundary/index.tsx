/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
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

const NotifyBoundary = React.memo<NotifyBoundaryProps>(function NotifyBoundary(props) {
    const hookNotify = useNotify();
    const { open, message, messageIntl, mode, close, duration = AppTimer.notifyDuration, top = 70 } = hookNotify.data;

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
                className={classnames('w-full', { ['hidden']: !open })}
                onClose={close ? hookNotify.method.closeNotify : undefined}
                severity={mode}
                elevation={6}
                variant="filled"
            >
                <AlertTitle className="capitalize">{mode}!</AlertTitle>
                {messageIntl ? <FormattedMessage id={messageIntl} /> : message}
            </Alert>
        </Snackbar>
    );
});

export default NotifyBoundary;
