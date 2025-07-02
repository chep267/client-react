/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Tooltip from '@mui/material/Tooltip';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

export default function AppButtonDev(props: any) {
    const { icon } = props;
    const notifyAction = useNotifyStore(({ action }) => action);

    const onDev = () => {
        notifyAction.openNotify({ open: true, color: 'warning', message: 'In developing!' });
    };

    return (
        <Tooltip title={<FormattedMessage id={BaseLanguage.component.label.develop} />}>
            <IconButton
                className="m-0 h-10 w-10 min-w-10 rounded-full border-0 p-0 text-inherit hover:border"
                aria-label="dev"
                onClick={onDev}
            >
                {icon}
            </IconButton>
        </Tooltip>
    );
}
