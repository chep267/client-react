/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import TableCell from '@mui/material/TableCell';

/** components */
import CheckboxColumn from '@module-base/components/VirtualTable/CheckboxColumn';

/** types */
import { VirtualTableContentProps } from '@module-base/types';

const TableContent = React.memo<VirtualTableContentProps>((props) => {
    const { indexRow, item, columns, hasCheckbox, selected } = props;

    const ContentColumns = React.useMemo(() => {
        return columns?.map((column, indexCell) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { dataKey, variant = 'body', renderItem, hasSort, ...cellProps } = column;
            const value = item[dataKey];
            return (
                <TableCell key={`${indexRow}-${dataKey}`} variant={variant} {...cellProps}>
                    {typeof renderItem === 'function' ? renderItem({ item, dataKey, value, indexRow, indexCell }) : value}
                </TableCell>
            );
        });
    }, [indexRow, item, columns]);

    return (
        <React.Fragment key={item?.id || indexRow}>
            <CheckboxColumn id={item?.id || indexRow} hasCheckbox={hasCheckbox} checked={Boolean(selected)} />
            {ContentColumns}
        </React.Fragment>
    );
});

export default TableContent;
