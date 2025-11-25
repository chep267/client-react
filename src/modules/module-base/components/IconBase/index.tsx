/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

const Icons: Readonly<App.ModuleBase.Component.IconList> = {
    /** app icon */
    appLogo: React.lazy(() => import('@module-base/components/IconBase/svg/AppLogo')),

    /** another icon */
    error: React.lazy(() => import('@module-base/components/IconBase/svg/Error')),
    notFound: React.lazy(() => import('@module-base/components/IconBase/svg/NotFound')),
};

const IconBase = React.memo<App.ModuleBase.Component.IconBaseProps>(function IconBase(props) {
    const { name, size = 24, width = size, height = size, ...iconProps } = props;
    const Icon = Icons[name];

    return (
        <React.Suspense fallback={<Skeleton width={width} height={height} variant="circular" />}>
            <Icon name={name} width={width} height={height} {...iconProps} />
        </React.Suspense>
    );
});

export default IconBase;
