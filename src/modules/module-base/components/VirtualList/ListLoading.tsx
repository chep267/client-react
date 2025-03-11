/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

/** types */
import type { VirtualListLoadingProps } from '@module-base/types';

const ListLoading = React.memo(function ListLoading(props: VirtualListLoadingProps) {
    const { className, loading } = props;

    return (
        <Box
            className={classnames(
                'absolute z-10 flex h-full w-full items-center justify-center',
                {
                    ['hidden']: !loading,
                },
                className
            )}
            bgcolor="divider"
        >
            <CircularProgress color="primary" />
        </Box>
    );
});

export default ListLoading;
