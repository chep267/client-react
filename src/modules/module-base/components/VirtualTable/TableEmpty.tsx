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
import type { VirtualTableEmptyProps } from '@module-base/types';

const TableEmpty = React.memo<VirtualTableEmptyProps>(function TableEmpty(props) {
    const { className, content } = props;

    return (
        <Box
            className={classnames(
                'absolute top-15 right-0 bottom-0 left-0 z-10 flex min-h-32 items-center justify-center',
                className
            )}
        >
            <Typography>{content || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
        </Box>
    );
});

export default TableEmpty;
