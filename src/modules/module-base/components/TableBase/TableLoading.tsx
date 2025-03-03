/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** styles */
import { useStyles } from './styles';

/** types */
import type { TableLoadingProps } from '@module-base/types';

const TableLoading = React.memo(function TableLoading(props: TableLoadingProps) {
    const { loading, empty, emptyText } = props;
    const classes = useStyles();

    return (
        <Stack className={classes.tableLoading} display={loading || empty ? 'flex' : 'none'}>
            {loading ? (
                <CircularProgress color="primary" />
            ) : (
                <Typography>{emptyText || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
            )}
        </Stack>
    );
});

export default TableLoading;
