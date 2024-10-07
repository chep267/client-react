/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

/** types */
import type { ImageBaseProps, ReactEventHandler } from '@module-base/types';

/** styles */
const useStyles = makeStyles({
    loading: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
});

export default function ImageBase(props: ImageBaseProps) {
    const { alt = '', loading, onLoad, ...imageProps } = props;
    const classes = useStyles();

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
                <Skeleton className={classnames(classes.loading, 'image-base-loading')} variant="rectangular" />
            ) : null}
            <img alt={alt} onLoad={onLoadImage} loading={loading || 'lazy'} {...imageProps} />
        </>
    );
}
