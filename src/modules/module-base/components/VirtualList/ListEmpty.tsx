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

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** types */
import type { VirtualListEmptyProps } from '@module-base/types';

const ListEmpty = React.memo(function ListEmpty(props: VirtualListEmptyProps) {
    const { className, emptyText } = props;

    return (
        <Box className={classnames('flex h-full w-full items-center justify-center', className)}>
            <Typography>{emptyText || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
        </Box>
    );
});

export default ListEmpty;
