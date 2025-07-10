/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';
import { ParticleOptions } from '@module-base/constants/ParticleOptions';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import IconBase from '@module-base/components/IconBase';
import ButtonRetry from '@module-base/components/ErrorBoundary/FallbackDefault/ButtonRetry';
import Particle from '@module-base/components/Particles';

export default function FallbackDefault(props: App.ModuleBase.Component.FallbackDefaultProps) {
    const { isAutoReload } = props;
    const theme = useSettingStore((store) => store.data.theme);

    return (
        <Stack className="h-screen w-screen items-center justify-center overflow-hidden">
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
            <React.Suspense>
                <Particle options={ParticleOptions(theme)} />
            </React.Suspense>
        </Stack>
    );
}
