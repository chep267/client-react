/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** types */
import type { TableBaseProps } from '@module-base/types';

function TableEmpty(props: Pick<TableBaseProps, 'emptyContent'>) {
    const { emptyContent } = props;
    return (
        <Box className="absolute top-0 right-0 bottom-0 left-0 z-1 flex items-center justify-center">
            <Typography>{emptyContent || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
        </Box>
    );
}

export default React.memo(TableEmpty);
