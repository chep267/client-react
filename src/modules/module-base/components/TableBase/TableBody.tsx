/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import TableBodyElem from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

/** styles */
import { useStyles } from './styles';

/** types */
import type { TableBodyProps } from '@module-base/types';

const TableBody = React.memo(function TableBody(props: TableBodyProps) {
    const { data, rows, tableRowProps, tableCellProps } = props;
    const classes = useStyles();

    return (
        <TableBodyElem>
            {data?.map((item, indexRow) => {
                // @ts-ignore
                const rowKey = `${item?.key || item?.id || `${indexRow}-${Date.now()}`}`;

                return (
                    <TableRow
                        key={rowKey}
                        {...tableRowProps}
                        className={classnames(
                            classes.tableRow,
                            { [classes.tableRowHover]: tableRowProps?.hover },
                            tableRowProps?.className
                        )}>
                        {rows?.map((cell, indexCell) => (
                            <TableCell key={`${rowKey}-${cell.id}`} {...tableCellProps}>
                                {cell.render(item, indexRow, indexCell)}
                            </TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </TableBodyElem>
    );
});

export default TableBody;
