/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** components */
import IconBase from '@module-base/components/IconBase';
import ButtonRetry from '@module-base/providers/NotifyProvider/FallbackDefault/ButtonRetry';

/** screens */
import LayerScreen from '@module-base/screens/LayerScreen';

export default function FallbackDefault(props: App.ModuleBase.Component.FallbackDefaultProps) {
    const { isAutoReload } = props;

    return (
        <LayerScreen className="h-screen w-screen items-center justify-center overflow-hidden">
            <Stack className="z-1 items-center justify-center">
                <IconBase name="error" width={237} height={213} />
                <Typography className={clsx('font-medium', 'text-3xl', 'md:text-5xl')} color="error">
                    <FormattedMessage id={BaseLanguage.component.label.error.fallback.title} />
                </Typography>
                <Typography className={clsx('font-medium', 'text-xl', 'md:text-2xl')} color="error">
                    <FormattedMessage id={BaseLanguage.component.label.error.fallback.content} />
                </Typography>
                <ButtonRetry isAutoReload={isAutoReload} />
            </Stack>
        </LayerScreen>
    );
}
