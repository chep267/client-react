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
import { BaseLanguage } from '@module-base/constants/BaseLanguage.ts';

/** styles */
import { useStyles } from './styles';

/** types */
import type { ListLoadingProps } from '@module-base/types';

const ListLoading = React.memo(function ListLoading(props: ListLoadingProps) {
    const { loading, empty, emptyText } = props;
    const classes = useStyles();

    return (
        <Stack className={classes.listLoading} display={loading || empty ? 'flex' : 'none'}>
            {loading ? (
                <CircularProgress color="primary" />
            ) : (
                <Typography>{emptyText || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
            )}
        </Stack>
    );
});

export default ListLoading;
