/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '@mui/material/styles';

/** constants */
import { particleOptions } from '@module-base/utils/particleOptions.ts';

/** types */
import type { IParticlesProps } from '@tsparticles/react';

const Particle = React.memo(function Particle(props: IParticlesProps) {
    const { options: Options } = props;
    const theme = useTheme();
    const id = React.useId();

    const [init, setInit] = React.useState(false);

    React.useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = Options || particleOptions(theme.palette.mode);

    // @ts-ignore
    return init ? <Particles id={`Particles-${id}`} options={options} /> : null;
});

export default Particle;
