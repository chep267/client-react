/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

/** types */
import { VirtualTableContentProps } from '@module-base/types';

export default function TableContent(props: VirtualTableContentProps) {
    const { indexRow, item, columns, hasSelected, selectedIds, onSelect } = props;

    return (
        <React.Fragment>
            {hasSelected && (
                <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={selectedIds?.includes(item.id)} onClick={() => onSelect?.(item.id)} />
                </TableCell>
            )}
            {columns?.map((column, indexCell) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { dataKey, variant = 'body', render, hasSort, ...cellProps } = column;
                const value = item[dataKey];
                return (
                    <TableCell key={dataKey} variant={variant} {...cellProps}>
                        {typeof render === 'function' ? render({ item, dataKey, value, indexRow, indexCell }) : value}
                    </TableCell>
                );
            })}
        </React.Fragment>
    );
}
