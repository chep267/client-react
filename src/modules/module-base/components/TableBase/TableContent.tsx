/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

/** components */
import CheckboxColumn from '@module-base/components/VirtualTable/CheckboxColumn';

/** types */
import type { VirtualTableContentProps } from '@module-base/types';

const TableContent = React.memo<VirtualTableContentProps>(function TableContent(props) {
    const { indexRow, item, columns, hasCheckbox, checked, dataKeyForCheckbox, onSelect } = props;

    return (
        <TableRow>
            <CheckboxColumn
                id={dataKeyForCheckbox ? item[dataKeyForCheckbox] : ''}
                hasCheckbox={hasCheckbox}
                checked={Boolean(checked)}
                onClick={() => onSelect?.(item)}
            />
            {columns?.map((column, indexCell) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { dataKey, renderItem, hasSort, onClick, onClickItem, ...cellProps } = column;
                const value = item[dataKey];
                return (
                    <TableCell
                        key={dataKey}
                        variant="body"
                        onClick={(event) => {
                            onClick?.(event);
                            onClickItem?.(event, item);
                            onSelect?.(item);
                        }}
                        {...cellProps}
                    >
                        {typeof renderItem === 'function' ? renderItem({ dataKey, indexRow, indexCell, item, value }) : value}
                    </TableCell>
                );
            })}
        </TableRow>
    );
});

export default TableContent;
