/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

/** styles */
import { useStyles } from './styles';

/** types */
import type { TableHeaderProps } from '@module-base/types';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

const TableHeader = React.memo(function TableHeader(props: TableHeaderProps) {
    const { rows, orderType, orderBy, onSort, tableRowProps, tableCellProps } = props;
    const classes = useStyles();

    const rowProps = (tableRowProps ?? AppDefaultValue.emptyObject) as NonNullable<TableHeaderProps['tableRowProps']>;
    const cellProps = (tableCellProps ?? AppDefaultValue.emptyObject) as NonNullable<TableHeaderProps['tableCellProps']>;

    return (
        <TableHead className={classes.tableHead}>
            <TableRow {...rowProps}>
                {rows?.map((cell) => (
                    <TableCell
                        key={cell.id}
                        align="left"
                        padding="normal"
                        sortDirection={orderBy === cell.id ? orderType : false}
                        {...cellProps}
                    >
                        {!cell.isSort || !orderBy || !orderType ? (
                            cell.label
                        ) : (
                            <TableSortLabel
                                active={orderBy === cell.id}
                                direction={orderBy === cell.id ? orderType : 'asc'}
                                IconComponent={ArrowDropDownIcon}
                                onClick={() => onSort?.(cell.id)}
                            >
                                {cell.label}
                                {orderBy === cell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {orderType === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
});

export default TableHeader;
