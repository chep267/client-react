/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
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
    const { children, className = 'flex h-full w-full items-center justify-center' } = props;
    const theme = useSettingStore((store) => store.data.theme);

    return (
        <Box className={className}>
            {children}
            <React.Suspense fallback={null}>
                <Particle options={ParticleOptions(theme)} />
            </React.Suspense>
        </Box>
    );
}
