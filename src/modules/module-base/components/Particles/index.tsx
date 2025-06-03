/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

/** types */
import type { IParticlesProps } from '@tsparticles/react';

const Particle = React.memo(function Particle(props: IParticlesProps) {
    const { options } = props;

    const id = React.useId();
    const [init, setInit] = React.useState(false);

    React.useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    if (!init) {
        return null;
    }

    return <Particles id={`Particles-${id}`} options={options} />;
});

export default Particle;
