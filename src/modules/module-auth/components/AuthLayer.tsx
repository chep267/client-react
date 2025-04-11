/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';

/** constants */
import { ParticleOptions } from '@module-base/constants/ParticleOptions';
import { themeObject } from '@module-theme/constants/themeObject';

/** components */
import Particle from '@module-base/components/Particles';

export default function AuthLayer() {
    const { mode, systemMode } = useColorScheme();

    const options = React.useMemo(() => {
        const value = systemMode || (mode && mode === themeObject.light ? themeObject.light : themeObject.dark);
        return ParticleOptions(value);
    }, [mode]);

    return <Particle options={options} />;
}
