/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

/** types */
import type { IconBaseProps, TypeIcons } from '@module-base/types';

const Icons: Readonly<TypeIcons> = {
    /** app icon */
    appLogo: React.lazy(() => import('@module-base/components/IconBase/svg/AppLogo')),

    /** other icon */
    error: React.lazy(() => import('@module-base/components/IconBase/svg/Error')),
    notFound: React.lazy(() => import('@module-base/components/IconBase/svg/NotFound')),
};

const IconBase = React.memo(function IconBase(props: IconBaseProps) {
    const { name, width, height, size = 24, ...iconProps } = props;
    const Icon = Icons[name];

    return (
        <React.Suspense fallback={<Skeleton width={width || size} height={height || size} variant="circular" />}>
            <Icon name={name} width={width || size} height={height || size} {...iconProps} />
        </React.Suspense>
    );
});

export default IconBase;
