/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import TableCell from '@mui/material/TableCell';

/** components */
import CheckboxColumn from '@module-base/components/TableBase/CheckboxColumn';

/** types */
import type { TypeTableData, TableContentProps } from '@module-base/types';

function TableContent<D extends TypeTableData>(props: TableContentProps<D>) {
    const { indexRow, item, columns, hasCheckbox, checked, onSelect } = props;

    return (
        <React.Fragment>
            <CheckboxColumn hasCheckbox={hasCheckbox} checked={Boolean(checked)} onClick={() => onSelect?.(item)} />
            {columns?.map((column, indexCell) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { dataKey, renderItem, hasSort, onClick, onClickItem, ...cellProps } = column;
                const value = item[dataKey] as string | number;
                return (
                    <TableCell
                        key={dataKey}
                        variant="body"
                        onClick={(event) => {
                            onClick?.(event);
                            onClickItem?.(event, { indexRow, indexCell, item });
                            onSelect?.(item);
                        }}
                        {...cellProps}
                    >
                        {typeof renderItem === 'function' ? renderItem({ indexRow, indexCell, item }) : value}
                    </TableCell>
                );
            })}
        </React.Fragment>
    );
}

export default React.memo(TableContent);
