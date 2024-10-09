/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '@mui/material/styles';

/** constants */
import { ParticleOptions } from '@module-base/constants/ParticleOptions';

/** types */
import type { IParticlesProps } from '@tsparticles/react';

const Particle = React.memo(function Particle(props: IParticlesProps) {
    const { options: optionsBase } = props;

    const hookThemeLib = useTheme();
    const id = React.useId();
    const { mode } = hookThemeLib.palette;

    const [init, setInit] = React.useState(false);

    React.useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const options = React.useMemo(() => {
        return optionsBase || ParticleOptions(mode);
    }, [optionsBase, mode]);

    return init ? <Particles id={`Particles-${id}`} options={options} /> : null;
});

export default Particle;
