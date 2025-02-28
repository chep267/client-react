/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** hooks */
import { useCountdown } from '@module-base/hooks/useCountdown';

/** types */
import type { FallbackDefaultProps } from '@module-base/types';

export default function ButtonRetry(props: Pick<FallbackDefaultProps, 'isAutoReload'>) {
    const { isAutoReload = true } = props;

    const reloadWindow = React.useCallback(() => window.location.reload(), []);

    const { second } = useCountdown({ callback: reloadWindow, numberCountdown: AppTimer.countdownError });

    const renderContent = React.useMemo(() => {
        return (
            <Button onClick={reloadWindow} variant="outlined" size="large" color="error">
                <FormattedMessage id={BaseLanguage.component.button.retry} />
            </Button>
        );
    }, []);

    return (
        <Stack className="items-center justify-center pt-3">
            {renderContent}
            {isAutoReload ? (
                <Typography className="pt-3 text-base" color="error">
                    <FormattedMessage id={BaseLanguage.component.label.error.fallback.autoReload} values={{ second }} />
                </Typography>
            ) : null}
        </Stack>
    );
}
