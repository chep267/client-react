/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { AppScreenSize } from '@module-base/constants/AppScreenSize';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

export default function NotifyBoundary(props: App.ModuleBase.Component.NotifyBoundaryProps) {
    const notifyStore = useNotifyStore();
    const {
        open,
        message,
        messageIntl,
        color,
        anchorOrigin,
        duration = AppTimer.notifyDuration,
        top = AppScreenSize.HeaderHeight + 6,
    } = notifyStore.data;

    return (
        <Snackbar
            key="base-notify-boundary-app"
            open={open}
            style={{ top }}
            autoHideDuration={duration}
            anchorOrigin={anchorOrigin}
            onClose={notifyStore.action.closeNotify}
            {...props}
        >
            <Alert
                className={clsx('w-full', { ['hidden']: !open })}
                onClose={notifyStore.action.closeNotify}
                severity={color}
                elevation={6}
                variant="filled"
            >
                <AlertTitle className="capitalize">{color}!</AlertTitle>
                {messageIntl ? <FormattedMessage id={messageIntl} /> : message}
            </Alert>
        </Snackbar>
    );
}
