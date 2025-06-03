/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Skeleton from '@mui/material/Skeleton';

const ImageBase = React.memo(function ImageBase(props: App.ModuleBase.Component.ImageBaseProps) {
    const { alt = '', loading, onLoad, className, ...imageProps } = props;
    const [isLoading, setLoading] = React.useState(true);

    const onLoadImage = React.useCallback<React.ReactEventHandler<HTMLImageElement>>((event) => {
        onLoad?.(event);
        setLoading(false);
    }, []);

    return (
        <div className={clsx('relative', className)}>
            {isLoading ? (
                <Skeleton className="absolute top-0 right-0 bottom-0 left-0 z-1 h-full w-full" variant="rectangular" />
            ) : null}
            <img alt={alt} className={className} loading={loading || 'lazy'} onLoad={onLoadImage} {...imageProps} />
        </div>
    );
});

export default ImageBase;
