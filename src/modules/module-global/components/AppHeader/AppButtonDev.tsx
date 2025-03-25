/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Tooltip from '@mui/material/Tooltip';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** utils */
import { useNotify } from '@module-base/hooks/useNotify';

export default function AppButtonDev(props: any) {
    const { icon } = props;
    const hookNotify = useNotify();

    const onDev = () => {
        hookNotify.method.toggleNotify({ open: true, mode: 'warning', message: 'In developing!' });
    };

    return (
        <Tooltip title={<FormattedMessage id={BaseLanguage.component.label.develop} />}>
            <IconButton
                className="m-0 h-10 w-10 min-w-10 rounded-full border-0 p-0 hover:border"
                aria-label="dev"
                onClick={onDev}
            >
                {icon}
            </IconButton>
        </Tooltip>
    );
}
