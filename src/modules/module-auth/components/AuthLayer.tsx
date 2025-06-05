/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';

/** constants */
import { ParticleOptions } from '@module-base/constants/ParticleOptions';
import { ThemeObject } from '@module-theme/constants/ThemeObject';

/** components */
import Particle from '@module-base/components/Particles';

export default function AuthLayer() {
    const { mode, systemMode } = useColorScheme();

    const options = React.useMemo(() => {
        const value = systemMode || (mode === ThemeObject.light ? ThemeObject.light : ThemeObject.dark);
        return ParticleOptions(value);
    }, [mode]);

    return <Particle options={options} />;
}
