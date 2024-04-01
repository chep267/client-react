/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

/** utils */
import { useNotify } from '@module-base/hooks/useNotify.ts';

export default function AppButtonDev(props: any) {
    const { tooltip, icon } = props;
    const NOTIFY = useNotify();

    const onDev = () => {
        NOTIFY.method.toggleNotify({ open: true, mode: 'warning', message: 'In developing!' });
    };

    return (
        <Tooltip title={tooltip}>
            <Button
                className="w-10 min-w-10 h-10 rounded-full p-0 m-0 border-0 hover:border"
                variant="outlined"
                onClick={onDev}>
                {icon}
            </Button>
        </Tooltip>
    );
}
