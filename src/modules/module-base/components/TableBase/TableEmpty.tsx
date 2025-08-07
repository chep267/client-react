/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

const TableEmpty = React.memo<Pick<App.ModuleBase.Component.TableBaseProps, 'emptyContent'>>(
    function TableEmpty(props) {
        const { emptyContent } = props;

        return (
            <Box className="absolute top-0 right-0 bottom-0 left-0 z-1 flex items-center justify-center">
                <Typography>{emptyContent || <FormattedMessage id={BaseLanguage.component.table.empty} />}</Typography>
            </Box>
        );
    }
);

export default TableEmpty;
