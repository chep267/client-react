/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { ParticleOptions } from '@module-base/constants/ParticleOptions';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));

export default function AuthLayer() {
    const theme = useSettingStore((store) => store.data.theme);

    return (
        <React.Suspense>
            <Particle options={ParticleOptions(theme)} />
        </React.Suspense>
    );
}
