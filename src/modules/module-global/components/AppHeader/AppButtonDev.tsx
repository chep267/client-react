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
import { useSettingStore } from '@module-base/stores/useSettingStore';

export default function AppButtonDev(props: any) {
    const { icon } = props;
    const settingAction = useSettingStore(({ action }) => action);

    const onDev = () => {
        settingAction.changeNotify({ open: true, color: 'warning', message: 'In developing!' });
    };

    return (
        <Tooltip title={<FormattedMessage id={BaseLanguage.component.label.develop} />} arrow>
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
