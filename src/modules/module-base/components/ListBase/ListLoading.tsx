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
import classnames from 'classnames';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** types */
import type { ListLoadingProps } from '@module-base/types';

const ListLoading = React.memo(function ListLoading(props: ListLoadingProps) {
    const { loading, empty, emptyText } = props;

    return (
        <Stack
            className={classnames(
                'absolute top-0 right-0 bottom-0 left-0 z-10 items-center justify-center',
                'bg-gray-800/50',
                'dark:bg-gray-800/80',
                {
                    ['hidden']: !(loading || empty),
                }
            )}
        >
            {loading ? (
                <CircularProgress color="primary" />
            ) : (
                <Typography>{emptyText || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
            )}
        </Stack>
    );
});

export default ListLoading;
