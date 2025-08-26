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
import { useSettingStore } from '@module-base/stores/useSettingStore';

export default function NotifyBoundary(props: App.ModuleBase.Component.NotifyBoundaryProps) {
    const notifyData = useSettingStore(({ data }) => data.notify);
    const settingAction = useSettingStore(({ action }) => action);

    const {
        open,
        message,
        messageIntl,
        color,
        anchorOrigin,
        duration = AppTimer.notifyDuration,
        top = AppScreenSize.HeaderHeight + 6,
    } = notifyData;

    const closeNotify = () => settingAction.changeNotify();

    return (
        <Snackbar
            key="base-notify-boundary-app"
            open={open}
            style={{ top }}
            autoHideDuration={duration}
            anchorOrigin={anchorOrigin}
            onClose={closeNotify}
            {...props}
        >
            <Alert
                className={clsx('w-full', { ['hidden']: !open })}
                onClose={closeNotify}
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
