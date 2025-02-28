/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** types */
import { VirtualTableHeaderProps } from '@module-base/types';

export default function TableHeader(props: VirtualTableHeaderProps) {
    const {
        columns,
        headerClassName,
        orderBy,
        orderType,
        hasSelected,
        totalSelectedItems,
        totalItems,
        onRequestSort,
        onSelectAll,
    } = props;

    return (
        <TableRow key="header" className={headerClassName} sx={{ backgroundColor: 'background.paper' }}>
            {hasSelected && (
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={Boolean(
                            totalSelectedItems && totalItems && totalSelectedItems > 0 && totalSelectedItems < totalItems
                        )}
                        checked={Boolean(totalItems && totalItems > 0 && totalSelectedItems === totalItems)}
                        onChange={onSelectAll}
                    />
                </TableCell>
            )}
            {columns?.map((column) => {
                const { dataKey, variant = 'head', hasSort, children, ...cellProps } = column;
                return (
                    <TableCell key={dataKey} variant={variant} {...cellProps}>
                        {!hasSort ? (
                            children
                        ) : (
                            <TableSortLabel
                                active={orderBy === dataKey}
                                direction={orderBy === dataKey ? orderType : OrderType.asc}
                                IconComponent={ArrowDropDownIcon}
                                onClick={() => onRequestSort?.(dataKey)}
                            >
                                {children}
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
}
