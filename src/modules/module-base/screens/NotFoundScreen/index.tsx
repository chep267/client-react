/**
 *
 * @author minh.nguyenquang@powergatesoftware.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

/** constants */
import { ParticleOptions } from '@module-base/constants/ParticleOptions';
import { ThemeObject } from '@module-theme/constants/ThemeObject';

/** components */
import IconBase from '@module-base/components/IconBase';
import Particle from '@module-base/components/Particles';

export default function NotFoundScreen() {
    const { mode, systemMode } = useColorScheme();

    const options = React.useMemo(() => {
        const value = systemMode || (mode === ThemeObject.light ? ThemeObject.light : ThemeObject.dark);
        return ParticleOptions(value);
    }, [mode]);

    return (
        <Box className="flex h-full w-full items-center justify-center">
            <IconBase name="notFound" className="h-full w-auto" />
            <React.Suspense fallback={null}>
                <Particle options={options} />
            </React.Suspense>
        </Box>
    );
}
