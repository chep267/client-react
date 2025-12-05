/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';

/** constants */
import { ParticleOptions } from '@module-base/constants/ParticleOptions';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));

type LayerScreenProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function LayerScreen(props: LayerScreenProps) {
    const { children, className } = props;
    const theme = useSettingStore((store) => store.data.theme);

    return (
        <Box className={clsx('flex items-center justify-center', 'h-full w-full', className)}>
            {children}
            <React.Suspense fallback={null}>
                <Particle options={ParticleOptions(theme)} />
            </React.Suspense>
        </Box>
    );
}
