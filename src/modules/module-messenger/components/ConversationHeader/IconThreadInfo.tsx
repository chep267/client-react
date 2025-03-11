/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Info as InfoIcon } from '@mui/icons-material';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

export default function IconThreadInfo() {
    const { method } = useMessenger();

    const onClick = React.useCallback(() => {
        method.setOpenThreadInfo((prev) => !prev);
    }, []);

    return (
        <IconButton onClick={onClick}>
            <InfoIcon color="primary" />
        </IconButton>
    );
}
