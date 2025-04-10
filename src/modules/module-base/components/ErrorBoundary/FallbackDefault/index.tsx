/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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

/** components */
import IconBase from '@module-base/components/IconBase';
import ButtonRetry from '@module-base/components/ErrorBoundary/FallbackDefault/ButtonRetry';

/** types */
import type { FallbackDefaultProps } from '@module-base/types';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));

export default function FallbackDefault(props: FallbackDefaultProps) {
    const { isAutoReload } = props;

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
                <Particle />
            </React.Suspense>
        </Stack>
    );
}
