/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** hooks */
import { useCountdown } from '@module-base/hooks/useCountdown';

function Timer() {
    const { second } = useCountdown({
        callback: () => window.location.reload(),
        numberCountdown: AppTimer.countdownError,
    });

    return <FormattedMessage id={BaseLanguage.component.label.error.fallback.autoReload} values={{ second }} />;
}

export default function ButtonRetry(props: Pick<App.ModuleBase.Component.FallbackDefaultProps, 'isAutoReload'>) {
    const { isAutoReload = true } = props;

    return (
        <Stack className="items-center justify-center pt-3">
            <Button onClick={() => window.location.reload()} variant="outlined" size="large" className="text-tw-danger">
                <FormattedMessage id={BaseLanguage.component.button.retry} />
            </Button>
            {isAutoReload ? (
                <Typography className="text-tw-danger pt-3 text-base">
                    <Timer />
                </Typography>
            ) : null}
        </Stack>
    );
}
