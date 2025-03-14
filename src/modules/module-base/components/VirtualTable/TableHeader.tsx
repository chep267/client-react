/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** components */
import CheckboxColumn from '@module-base/components/VirtualTable/CheckboxColumn';

/** types */
import type { VirtualTableHeaderProps } from '@module-base/types';

const TableHeader = React.memo<VirtualTableHeaderProps>(function TableHeader(props) {
    const { columns, className, orderBy, orderType, hasCheckbox, checked, indeterminate, onSort, onSelectAll } = props;

    return (
        <TableRow className={className} sx={{ backgroundColor: 'background.paper' }}>
            <CheckboxColumn
                hasCheckbox={hasCheckbox}
                indeterminate={Boolean(indeterminate)}
                checked={Boolean(checked)}
                onChange={onSelectAll}
            />
            {columns?.map((column) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { dataKey, hasSort, label, renderItem, onClick, onClickItem, ...cellProps } = column;
                return (
                    <TableCell key={dataKey} variant="head" {...cellProps}>
                        {!hasSort ? (
                            label
                        ) : (
                            <TableSortLabel
                                active={orderBy === dataKey}
                                direction={orderBy === dataKey ? orderType : OrderType.asc}
                                onClick={() => onSort?.(dataKey, orderBy || '')}
                            >
                                {label}
                                {orderBy === dataKey ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {orderType === OrderType.desc ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        )}
                    </TableCell>
                );
            })}
        </TableRow>
    );
});

export default TableHeader;
