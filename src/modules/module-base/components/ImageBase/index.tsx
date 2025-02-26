/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Skeleton from '@mui/material/Skeleton';

/** types */
import type { ImageBaseProps, ReactEventHandler } from '@module-base/types';

export default function ImageBase(props: ImageBaseProps) {
    const { alt = '', loading, onLoad, ...imageProps } = props;
    const [isLoading, setLoading] = React.useState(true);

    const onLoadImage = React.useCallback<ReactEventHandler<HTMLImageElement>>(
        (event) => {
            onLoad?.(event);
            setLoading(false);
        },
        [onLoad]
    );

    return (
        <>
            {isLoading ? (
                <Skeleton
                    className={classnames(
                        'absolute top-0 right-0 bottom-0 left-0 z-1 h-full w-full',
                        'image-base-loading',
                        `${imageProps.className || ''}`
                    )}
                    variant="rectangular"
                />
            ) : null}
            <img alt={alt} onLoad={onLoadImage} loading={loading || 'lazy'} {...imageProps} />
        </>
    );
}
