/**
 *
 * @author minh.nguyenquang@powergatesoftware.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Box from '@mui/material/Box';

/** components */
import IconBase from '@module-base/components/IconBase';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));

export default function NotFoundScreen() {
    return (
        <Box className="flex h-full w-full items-center justify-center">
            <IconBase name="notFound" className="h-full w-auto" />
            <React.Suspense fallback={null}>
                <Particle />
            </React.Suspense>
        </Box>
    );
}
