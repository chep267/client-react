/**
 *
 * @author minh.nguyenquang@powergatesoftware.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** lib components */
import Box from '@mui/material/Box';

/** components */
import IconBase from '@module-base/components/IconBase';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));

export default function NotFoundScreen() {
    return (
        <Box className="flex items-center justify-center w-full h-full">
            <IconBase name="notFound" className="w-auto h-full" />
            <React.Suspense fallback={null}>
                <Particle />
            </React.Suspense>
        </Box>
    );
}
