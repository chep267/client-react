/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { TableVirtuoso } from 'react-virtuoso';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** components */
import TableHeader from '@module-base/components/VirtualTable/TableHeader';
import TableContent from '@module-base/components/VirtualTable/TableContent';

/** utils */
import { getId, sortTableData } from '@module-base/utils/virtual';

/** types */
import type { TableComponents } from 'react-virtuoso';
import type { TypeId, TypeVirtualTableItemData, VirtualTableHeaderProps, VirtualTableProps } from '@module-base/types';

export default function VirtualTable<D extends TypeVirtualTableItemData, C>(props: VirtualTableProps<D, C>) {
    const {
        data,
        columns,
        className,
        headerClassName,
        hasCheckbox,
        dataKeyForCheckbox = 'id',
        orderBy: orderByProps,
        orderType: orderTypeProps,
        selectedIds: selectedIdsProps,
        onChangeOrder,
        onChangeSelected,
        ...tableProps
    } = props;

    const [orderType, setOrderType] = React.useState<NonNullable<VirtualTableProps<D, C>['orderType']>>();
    const [orderBy, setOrderBy] = React.useState<NonNullable<VirtualTableProps<D, C>['orderBy']>>();
    const [selectedIds, setSelectedIds] = React.useState<NonNullable<VirtualTableProps<D, C>['selectedIds']>>([]);

    React.useEffect(() => {
        if (orderTypeProps && orderTypeProps !== orderType) {
            setOrderType(orderTypeProps);
        }
        if (orderByProps && orderByProps !== orderBy) {
            setOrderBy(orderByProps);
        }
        if (selectedIdsProps && selectedIdsProps !== selectedIds) {
            setSelectedIds(selectedIdsProps);
        }
    }, [orderByProps, orderTypeProps, selectedIdsProps]);

    React.useEffect(() => {
        if ((orderType && orderType !== orderTypeProps) || (orderBy && orderBy !== orderByProps)) {
            onChangeOrder?.({ type: orderType, key: orderBy });
        }
    }, [orderType, orderBy]);

    React.useEffect(() => {
        onChangeSelected?.(selectedIds);
    }, [selectedIds]);

    const onSelectAll = React.useCallback<NonNullable<VirtualTableHeaderProps<D>['onSelectAll']>>(
        (event) => {
            setSelectedIds((prevIds) => {
                if (!data || !event.target.checked || prevIds.length === data.length) {
                    return [];
                }
                return data.map((d) => getId(d, dataKeyForCheckbox));
            });
        },
        [data]
    );

    const onSelectOne = React.useCallback((id: TypeId) => {
        setSelectedIds((prevIds) => {
            const selectedIndex = prevIds.indexOf(id);
            if (selectedIndex === -1) {
                return [...prevIds, id];
            }
            if (selectedIndex === 0) {
                return prevIds.slice(1);
            }
            if (selectedIndex === selectedIds.length - 1) {
                return prevIds.slice(0, -1);
            }
            return [...prevIds.slice(0, selectedIndex), ...prevIds.slice(selectedIndex + 1)];
        });
    }, []);

    const onSort = React.useCallback<NonNullable<VirtualTableHeaderProps<D>['onSort']>>((newKey, prevKey) => {
        setOrderBy(newKey);
        setOrderType((prevOrderType) => {
            const isAsc = prevKey === newKey && prevOrderType === OrderType.asc;
            return isAsc ? OrderType.desc : OrderType.asc;
        });
    }, []);

    const VirtualTableComponents = React.useMemo<TableComponents<D, C>>(
        () => ({
            Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
                <TableContainer component={Paper} {...props} ref={ref} />
            )),
            Table: (props) => <Table {...props} className="table-fixed border-separate" />,
            TableHead,
            TableRow,
            TableBody,
        }),
        []
    );

    const currentData = React.useMemo<NonNullable<VirtualTableProps<D, C>['data']>>(() => {
        if (!orderType || !orderBy) {
            return data || AppDefaultValue.emptyArray;
        }
        return sortTableData({ data, orderType, orderBy });
    }, [data, orderType, orderBy]);

    const fixedHeaderContent = () => {
        return (
            <TableHeader
                columns={columns}
                className={headerClassName}
                hasCheckbox={hasCheckbox}
                orderBy={orderBy}
                orderType={orderType}
                checked={Boolean(selectedIds.length === currentData.length)}
                indeterminate={Boolean(selectedIds.length && selectedIds.length < currentData.length)}
                onSort={onSort}
                onSelectAll={onSelectAll}
            />
        );
    };

    const itemContent = (indexRow: number, item: TypeVirtualTableItemData) => {
        return (
            <TableContent
                columns={columns}
                indexRow={indexRow}
                item={item}
                hasCheckbox={hasCheckbox}
                dataKeyForCheckbox={dataKeyForCheckbox}
                checked={selectedIds.includes(getId(item, dataKeyForCheckbox))}
                onSelect={onSelectOne}
            />
        );
    };

    return (
        <TableVirtuoso
            className={classnames('scrollbar-thin h-full w-full', className)}
            data={currentData}
            components={VirtualTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
            {...tableProps}
        />
    );
}
