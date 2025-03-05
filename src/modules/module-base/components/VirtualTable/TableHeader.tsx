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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** components */
import CheckboxColumn from '@module-base/components/VirtualTable/CheckboxColumn';

/** types */
import { VirtualTableHeaderProps } from '@module-base/types';

const TableHeader = React.memo<VirtualTableHeaderProps>(function TableHeader(props: VirtualTableHeaderProps) {
    const { columns, className, orderBy, orderType, hasCheckbox, totalSelectedItems, totalItems, onSort, onSelectAll } =
        props;

    const HeaderColumns = React.useMemo(() => {
        return columns?.map((column) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { dataKey, variant = 'head', hasSort, label, renderItem, ...cellProps } = column;
            return (
                <TableCell key={dataKey} variant={variant} {...cellProps}>
                    {!hasSort ? (
                        label
                    ) : (
                        <TableSortLabel
                            active={orderBy === dataKey}
                            direction={orderBy === dataKey ? orderType : OrderType.asc}
                            IconComponent={ArrowDropDownIcon}
                            onClick={() => onSort?.(dataKey, orderBy)}
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
        });
    }, [columns, orderBy, orderType]);

    return (
        <TableRow key="header" className={className} sx={{ backgroundColor: 'background.paper' }}>
            <CheckboxColumn
                hasCheckbox={hasCheckbox}
                indeterminate={Boolean(totalSelectedItems && totalItems && totalSelectedItems < totalItems)}
                checked={Boolean(totalSelectedItems && totalItems && totalSelectedItems === totalItems)}
                onChange={onSelectAll}
            />
            {HeaderColumns}
        </TableRow>
    );
});

export default TableHeader;
