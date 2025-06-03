/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const TableLoading = React.memo(function TableLoading() {
    return (
        <Box className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center" bgcolor="divider">
            <CircularProgress color="primary" />
        </Box>
    );
});

export default TableLoading;
