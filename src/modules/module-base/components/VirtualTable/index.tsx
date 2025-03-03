/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { TableVirtuoso } from 'react-virtuoso';
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
        onChangeOrderType,
        onChangeOrderBy,
    } = props;

    const [orderType, setOrderType] = React.useState<VirtualTableProps['orderType']>();
    const [orderBy, setOrderBy] = React.useState<VirtualTableProps['orderBy']>();
    const [selectedIds, setSelectedIds] = React.useState<(string | number)[]>([]);

    React.useEffect(() => {
        if (orderTypeProps !== orderType) {
            setOrderType(orderTypeProps);
        }
        if (orderByProps !== orderBy) {
            setOrderBy(orderByProps);
        }
    }, [orderByProps, orderTypeProps]);

    React.useEffect(() => {
        if (orderType && orderType !== orderTypeProps) {
            onChangeOrderType?.(orderType);
        }
        if (orderBy && orderBy !== orderByProps) {
            onChangeOrderBy?.(orderBy);
        }
    }, [orderType, orderBy]);

    const VirtualTableComponents = React.useMemo<TableComponents<any>>(
        () => ({
            Scroller: TableContainer,
            Table: (props) => <Table {...props} className="table-fixed border-separate" />,
            TableHead,
            TableRow,
            TableBody,
        }),
        []
    );

    const fixedHeaderContent = () => {
        const onRequestSort: VirtualTableHeaderProps['onRequestSort'] = (key) => {
            const isAsc = orderBy === key && orderType === OrderType.asc;
            setOrderType(isAsc ? OrderType.desc : OrderType.asc);
            setOrderBy(key);
        };
        const onSelectAll: VirtualTableHeaderProps['onSelectAll'] = (event) => {
            if (!currentData || !event.target.checked || selectedIds.length === currentData.length) {
                return setSelectedIds([]);
            }
            const ids = currentData.map((item) => item.id as string);
            return setSelectedIds(ids);
        };
        return (
            <TableHeader
                columns={columns}
                headerClassName={headerClassName}
                hasCheckbox={hasCheckbox}
                orderBy={orderBy}
                orderType={orderType}
                totalItems={currentData?.length}
                totalSelectedItems={selectedIds.length}
                onRequestSort={onRequestSort}
                onSelectAll={onSelectAll}
            />
        );
    };

    const itemContent = (indexRow: number, item: any) => {
        const onSelect = (id?: string | number) => {
            if (!id) {
                return;
            }
            const selectedIndex = selectedIds.indexOf(id);
            if (selectedIndex === -1) {
                return setSelectedIds((prev) => [...prev, id]);
            }
            if (selectedIndex === 0) {
                return setSelectedIds((prev) => prev.slice(1));
            }
            if (selectedIndex === selectedIds.length - 1) {
                return setSelectedIds((prev) => prev.slice(0, -1));
            }
            if (selectedIndex > 0) {
                return setSelectedIds((prev) => [...prev.slice(0, selectedIndex), ...prev.slice(selectedIndex + 1)]);
            }
        };

        return (
            <TableContent
                columns={columns}
                indexRow={indexRow}
                item={item}
                hasCheckbox={hasCheckbox}
                selected={selectedIds.includes(item?.id)}
                onSelect={onSelect}
            />
        );
    };

    const currentData = React.useMemo(() => {
        if (!orderType || !orderBy) {
            return data;
        }
        return sortTableData({ data, orderType, orderBy });
    }, [data, orderType, orderBy]);

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
