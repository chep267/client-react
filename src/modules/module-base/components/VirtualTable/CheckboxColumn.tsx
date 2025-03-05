/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

/** types */
import type { CheckboxColumnProps } from '@module-base/types';

const CheckboxColumn = React.memo<CheckboxColumnProps>(function CheckboxColumn(props) {
    const { hasCheckbox, ...checkboxProps } = props;

    if (!hasCheckbox) {
        return null;
    }
    return (
        <TableCell padding="checkbox">
            <Checkbox color="primary" {...checkboxProps} />
        </TableCell>
    );
});

export default CheckboxColumn;
