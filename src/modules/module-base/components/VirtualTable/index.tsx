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

/** components */
import TableHeader from '@module-base/components/VirtualTable/TableHeader';
import TableContent from '@module-base/components/VirtualTable/TableContent';

/** utils */
import { sortTableData } from '@module-base/utils/sortTableData';

/** types */
import type { TableComponents } from 'react-virtuoso';
import type { VirtualTableHeaderProps, VirtualTableProps } from '@module-base/types';

export default function VirtualTable(props: VirtualTableProps) {
    const {
        data,
        columns,
        className,
        headerClassName,
        hasCheckbox,
        orderBy: orderByProps,
        orderType: orderTypeProps,
        selectedIds: selectedIdsProps,
        onChangeOrder,
        onChangeSelected,
    } = props;

    const [orderType, setOrderType] = React.useState<NonNullable<VirtualTableProps['orderType']>>(OrderType.asc);
    const [orderBy, setOrderBy] = React.useState<NonNullable<VirtualTableProps['orderBy']>>(columns?.[0].dataKey || '');
    const [selectedIds, setSelectedIds] = React.useState<NonNullable<VirtualTableProps['selectedIds']>>([]);

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

    const onSelectAll = React.useCallback<NonNullable<VirtualTableHeaderProps['onSelectAll']>>(
        (event) => {
            setSelectedIds((prevIds) => {
                if (!data || !event.target.checked || prevIds.length === data.length) {
                    return [];
                }
                return data.map((item, index) => item?.id || index);
            });
        },
        [data]
    );

    const onSelectOne = React.useCallback((id: string | number) => {
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

    const onSort = React.useCallback<NonNullable<VirtualTableHeaderProps['onSort']>>((newKey, prevKey) => {
        setOrderBy(newKey);
        setOrderType((prevOrderType) => {
            const isAsc = prevKey === newKey && prevOrderType === OrderType.asc;
            return isAsc ? OrderType.desc : OrderType.asc;
        });
    }, []);

    const VirtualTableComponents = React.useMemo<TableComponents<any>>(
        () => ({
            Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
                <TableContainer component={Paper} {...props} ref={ref} />
            )),
            Table: (props) => <Table {...props} className="table-fixed border-separate" />,
            TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableHead {...props} ref={ref} />),
            TableRow: (props) => <TableRow {...props} onClick={() => onSelectOne(props.item?.id || props['data-index'])} />,
            TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
        }),
        []
    );

    const currentData = React.useMemo(() => {
        if (!orderType || !orderBy) {
            return data;
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
                totalItems={data?.length}
                totalSelectedItems={selectedIds.length}
                onSort={onSort}
                onSelectAll={onSelectAll}
            />
        );
    };

    const itemContent = (indexRow: number, item: any) => {
        return (
            <TableContent
                columns={columns}
                indexRow={indexRow}
                item={item}
                hasCheckbox={hasCheckbox}
                selected={selectedIds.includes(item?.id || indexRow)}
            />
        );
    };

    return (
        <TableVirtuoso
            className={classnames('h-full w-full', className)}
            data={currentData}
            components={VirtualTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
        />
    );
}
