/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

/** components */
import TableLoading from './TableLoading';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

/** styles */
import { useStyles } from './styles';

/** types */
import type { TableBaseProps } from '@module-base/types';

const TableBase = React.memo(function TableBase(props: TableBaseProps) {
    const {
        className,
        sx,
        loading,
        emptyText,

        data,
        rows,
        orderBy,
        orderType,

        tableRowProps,
        tableCellProps,

        onScroll,
        onClickItem,
        onRequestSort,
    } = props;

    const classes = useStyles();

    return (
        <Box className={classnames(classes.tableBox, className)} sx={sx}>
            <TableLoading loading={loading} empty={!data?.length} emptyText={emptyText} />
            <TableContainer onScroll={onScroll} className={classes.tableContainer}>
                <Table stickyHeader size="medium" className={classes.table}>
                    <TableHeader
                        rows={rows}
                        orderBy={orderBy}
                        orderType={orderType}
                        tableCellProps={tableCellProps}
                        onRequestSort={onRequestSort}
                    />
                    <TableBody
                        data={data}
                        rows={rows}
                        onClickItem={onClickItem}
                        tableCellProps={tableCellProps}
                        tableRowProps={tableRowProps}
                    />
                </Table>
            </TableContainer>
        </Box>
    );
});

export default TableBase;
