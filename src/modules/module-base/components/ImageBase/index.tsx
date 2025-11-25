/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Skeleton from '@mui/material/Skeleton';

const ImageBase = React.memo<App.ModuleBase.Component.ImageBaseProps>(function ImageBase(props) {
    const { alt = '', loading = 'lazy', onLoad, className, ...imageProps } = props;
    const [isLoading, setLoading] = React.useState(true);

    return (
        <div className={clsx('relative', className)}>
            {isLoading ? (
                <Skeleton
                    className={clsx('absolute', 'h-full w-full', 'top-0 right-0 bottom-0 left-0 z-1')}
                    variant="rectangular"
                />
            ) : null}
            <img
                alt={alt}
                className={className}
                loading={loading}
                onLoad={(event) => {
                    onLoad?.(event);
                    setLoading(false);
                }}
                {...imageProps}
            />
        </div>
    );
});

export default ImageBase;
