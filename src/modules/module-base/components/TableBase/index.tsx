/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** utils */
import { sortTableData } from '@module-base/utils/virtual';

/** components */
import TableLoading from '@module-base/components/TableBase/TableLoading';
import TableEmpty from '@module-base/components/TableBase/TableEmpty';
import TableHeader from '@module-base/components/TableBase/TableHeader';
import TableContent from '@module-base/components/TableBase/TableContent';

/** types */
import type { TableBaseProps, TableHeaderProps, TypeDataKey, TypeOrderType, TypeTableData } from '@module-base/types';

export default function TableBase<D extends TypeTableData = TypeTableData>(props: TableBaseProps<D>) {
    const {
        data,
        loading,
        columns,
        className,
        hasCheckbox,
        dataKeyForCheckbox,
        emptyContent,
        onChangeSelected,
        ...tableProps
    } = props;

    const [orderType, setOrderType] = React.useState<TypeOrderType>();
    const [orderBy, setOrderBy] = React.useState<TypeDataKey<D>>();
    const [selectedIds, setSelectedIds] = React.useState<Array<D[TypeDataKey<D>]>>([]);

    React.useEffect(() => {
        onChangeSelected?.(selectedIds);
    }, [selectedIds]);

    const onSelectAll = React.useCallback<NonNullable<TableHeaderProps<D>['onSelectAll']>>(
        (event) => {
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
        (item: D) => {
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
        const checked = hasCheckbox && dataKeyForCheckbox ? selectedIds.includes(item[dataKeyForCheckbox]) : false;
        return (
            <TableRow key={indexRow}>
                <TableContent
                    columns={columns}
                    indexRow={indexRow}
                    item={item}
                    hasCheckbox={hasCheckbox}
                    checked={checked}
                    onSelect={onSelectOne}
                />
            </TableRow>
        );
    };

    return (
        <Box className={clsx('relative h-full w-full', className)}>
            {loading ? <TableLoading /> : null}
            <TableContainer className="absolute top-0 right-0 bottom-0 left-0 z-1 h-full w-full">
                <Table stickyHeader size="medium" {...tableProps}>
                    <TableHead>
                        <TableHeader
                            columns={columns}
                            hasCheckbox={hasCheckbox}
                            orderBy={orderBy}
                            orderType={orderType}
                            checked={Boolean(selectedIds.length && selectedIds.length === currentData.length)}
                            indeterminate={Boolean(selectedIds.length && selectedIds.length < currentData.length)}
                            onSort={onSort}
                            onSelectAll={onSelectAll}
                        />
                    </TableHead>
                    <TableBody>
                        {loading || currentData.length ? null : <TableEmpty emptyContent={emptyContent} />}
                        {currentData.map(itemContent)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
