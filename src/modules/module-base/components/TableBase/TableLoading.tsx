/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** types */
import type { TableLoadingProps } from '@module-base/types';

const TableLoading = React.memo(function TableLoading(props: TableLoadingProps) {
    const { loading, empty, emptyText } = props;

    return (
        <Box
            className={classnames('absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center', {
                ['hidden']: !loading && !empty,
            })}
            bgcolor="divider"
        >
            {loading ? (
                <CircularProgress color="primary" />
            ) : (
                <Typography>{emptyText || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
            )}
        </Box>
    );
});

export default TableLoading;
