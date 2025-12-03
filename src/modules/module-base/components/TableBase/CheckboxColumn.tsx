/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

const CheckboxColumn = React.memo<App.ModuleBase.Component.CheckboxColumnProps>(function CheckboxColumn(props) {
    const { hasCheckbox, ...checkboxProps } = props;

    if (!hasCheckbox) {
        return null;
    }
    return (
        <TableCell padding="checkbox">
            <Checkbox className="text-tw-primary" {...checkboxProps} />
        </TableCell>
    );
});

export default CheckboxColumn;
