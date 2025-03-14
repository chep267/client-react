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
import type { VirtualTableLoadingProps } from '@module-base/types';

const TableLoading = React.memo<VirtualTableLoadingProps>(function TableLoading(props) {
    const { loading } = props;

    return (
        <Box
            className={classnames('absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center', {
                ['hidden']: !loading,
            })}
            bgcolor="divider"
        >
            <CircularProgress color="primary" />
        </Box>
    );
});

export default TableLoading;
