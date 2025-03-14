/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { TableVirtuoso } from 'react-virtuoso';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** components */
import TableContainer from '@module-base/components/VirtualTable/TableContainer';
import TableHeader from '@module-base/components/VirtualTable/TableHeader';
import TableContent from '@module-base/components/VirtualTable/TableContent';
import TableEmpty from '@module-base/components/VirtualTable/TableEmpty';

/** utils */
import { sortTableData } from '@module-base/utils/virtual';

/** types */
import type { ChangeEvent } from 'react';
import type { TypeDataKey, TypeOrderType, VirtualTableContainerProps, VirtualTableProps } from '@module-base/types';

export default function VirtualTable<D, C>(props: VirtualTableProps<D, C>) {
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

    const VirtualTableComponents = React.useMemo<VirtualTableProps<D, C>['components']>(
        () => ({
            Scroller: React.forwardRef<HTMLDivElement, VirtualTableContainerProps>((props, ref) => (
                <TableContainer loading={loading} {...props} ref={ref} />
            )),
            Table: (props) => <Table {...props} className="table-fixed border-separate" />,
            TableHead,
            TableRow,
            TableBody,
            EmptyPlaceholder: () => (loading ? null : <TableEmpty {...slotProps?.empty} />),
        }),
        [slotProps?.empty, loading]
    );

    const currentData = React.useMemo<Readonly<D[]>>(() => {
        if (!orderType || !orderBy) {
            return data || AppDefaultValue.emptyArray;
        }
        return sortTableData({ data, orderType, orderBy });
    }, [data, orderType, orderBy]);

    const fixedHeaderContent = () => {
        return (
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
        );
    };

    const itemContent = (indexRow: number, item: D) => {
        const checked = hasCheckbox ? selectedIds.includes(item[dataKeyForCheckbox]) : false;
        return (
            <TableContent
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
        <TableVirtuoso
            className={classnames('h-full w-full', className)}
            data={currentData}
            components={VirtualTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
            {...tableProps}
        />
    );
}
