/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** utils */
import { getId, sortTableData } from '@module-base/utils/virtual';

/** components */
import TableLoading from './TableLoading';
import TableHeader from './TableHeader';
import TableContent from './TableContent';

/** styles */
import { useStyles } from './styles';

/** types */
import type { TableBaseProps, TableHeaderProps, TypeDataKey, TypeOrderType, VirtualTableProps } from '@module-base/types';
import type { ChangeEvent } from 'react';

export default function TableBase<D>(props: TableBaseProps<D>) {
    // const {
    //     loading,
    //     data,
    //     columns,
    //     className,
    //     hasCheckbox,
    //     dataKeyForCheckbox = 'id',
    //     onChangeSelected,
    //     onScroll,
    //     ...tableProps
    // } = props;
    const { data, loading, columns, className, hasCheckbox, dataKeyForCheckbox, slotProps, onChangeSelected, ...tableProps } =
        props;

    const [orderType, setOrderType] = React.useState<TypeOrderType>();
    const [orderBy, setOrderBy] = React.useState<TypeDataKey<D>>();
    const [selectedIds, setSelectedIds] = React.useState<Array<D[TypeDataKey<D>]>>([]);

    React.useEffect(() => {
        onChangeSelected?.(selectedIds);
    }, [selectedIds]);

    const onSelectAll = React.useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!dataKeyForCheckbox) {
                return;
            }
            setSelectedIds((prevIds) => {
                if (!data || !event.target.checked || prevIds.length === data.length) {
                    return [];
                }
                return data.map((item) => item[dataKeyForCheckbox]);
            });
        },
        [data]
    );

    const onSelectOne = React.useCallback(
        (item: NonNullable<TableBaseProps<D>['data']>[number]) => {
            if (!dataKeyForCheckbox) {
                return;
            }
            setSelectedIds((prevIds) => {
                const selectedIndex = prevIds.indexOf(item[dataKeyForCheckbox]);
                if (selectedIndex === -1) {
                    return [...prevIds, item[dataKeyForCheckbox]];
                }
                if (selectedIndex === 0) {
                    return prevIds.slice(1);
                }
                if (selectedIndex === selectedIds.length - 1) {
                    return prevIds.slice(0, -1);
                }
                return [...prevIds.slice(0, selectedIndex), ...prevIds.slice(selectedIndex + 1)];
            });
        },
        [dataKeyForCheckbox]
    );

    const onSort = React.useCallback((newKey: TypeDataKey<D>, prevKey: TypeDataKey<D>) => {
        setOrderBy(newKey);
        setOrderType((prevOrderType) => {
            const isAsc = prevKey === newKey && prevOrderType === OrderType.asc;
            return isAsc ? OrderType.desc : OrderType.asc;
        });
    }, []);

    const currentData = React.useMemo<NonNullable<TableBaseProps<D>['data']>>(() => {
        if (!orderType || !orderBy) {
            return data || AppDefaultValue.emptyArray;
        }
        return sortTableData({ data, orderType, orderBy });
    }, [data, orderType, orderBy]);

    const itemContent = (item: D, indexRow: number) => {
        const checked = hasCheckbox ? selectedIds.includes(item[dataKeyForCheckbox]) : false;
        return (
            <TableContent
                key={indexRow}
                columns={columns}
                indexRow={indexRow}
                item={item}
                hasCheckbox={hasCheckbox}
                checked={checked}
                onSelect={onSelectOne}
            />
        );
    };

    return (
        <Box className={classnames('relative h-full w-full', className)}>
            <TableContainer
                className={classnames('absolute top-0 right-0 bottom-0 left-0 z-10 h-full w-full', {
                    ['overflow-hidden']: loading,
                })}
            >
                <TableLoading loading={loading} empty={!data?.length} emptyText="" />
                <Table stickyHeader size="medium" {...tableProps}>
                    <TableHeader
                        columns={columns}
                        hasCheckbox={hasCheckbox}
                        orderBy={orderBy}
                        orderType={orderType}
                        checked={Boolean(selectedIds.length === currentData.length)}
                        indeterminate={Boolean(selectedIds.length && selectedIds.length < currentData.length)}
                        onSort={onSort}
                        onSelectAll={onSelectAll}
                    />
                    <TableBody>{currentData.map(itemContent)}</TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
