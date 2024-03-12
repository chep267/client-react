/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** lib components */
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer.ts';

/** hooks */
import { useCountdown } from '@module-base/hooks/useCountdown.ts';

/** styles */
import { useStyles } from './styles';

/** types */
import type { FallbackDefaultProps } from '@module-base/models';

export default function ButtonRetry(props: Pick<FallbackDefaultProps, 'isAutoReload'>) {
    const { isAutoReload = true } = props;
    const classes = useStyles();

    const reloadWindow = React.useCallback(() => window.location.reload(), []);

    const { second } = useCountdown({ callback: reloadWindow, numberCountdown: AppTimer.countdownError });

    const renderContent = React.useMemo(() => {
        return (
            <Button onClick={reloadWindow} variant="outlined" size="large" color="error">
                <FormattedMessage id="module.base.error.fallback.retry" />
            </Button>
        );
    }, []);

    return (
        <Stack className={classes.content}>
            {renderContent}
            {isAutoReload ? (
                <Typography variant="subtitle1" fontWeight={600} color="error.main" pt={3}>
                    <FormattedMessage id="module.base.error.fallback.autoReload" values={{ second }} />
                </Typography>
            ) : null}
        </Stack>
    );
}
