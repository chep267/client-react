/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** components */
import TableLoading from '@module-base/components/TableBase/TableLoading';
import TableEmpty from '@module-base/components/TableBase/TableEmpty';
import TableHeader from '@module-base/components/TableBase/TableHeader';
import TableContent from '@module-base/components/TableBase/TableContent';

/** utils */
import { sortTableData } from '@module-base/utils/virtual';

/** types */
import type { ChangeEvent } from 'react';
import type { TypeDataKey, TypeOrderType, TypeTableData, VirtualTableProps } from '@module-base/types';

export default function VirtualTable<D extends TypeTableData = TypeTableData>(props: VirtualTableProps<D>) {
    const { data, loading, emptyContent, columns, hasCheckbox, dataKeyForCheckbox, onChangeSelected, ...tableProps } = props;

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

    const VirtualTableComponents = React.useMemo<VirtualTableProps<D>['components']>(
        () => ({
            Scroller: React.forwardRef<HTMLDivElement, any>((props, ref) => (
                <>
                    <TableContainer ref={ref} component="div" {...props} />
                    {loading ? <TableLoading /> : null}
                </>
            )),
            Table: (props) => <Table {...props} className="border-separate" />,
            TableHead,
            TableRow,
            TableBody,
            EmptyPlaceholder: () => (loading ? null : <TableEmpty emptyContent={emptyContent} />),
        }),
        [loading, emptyContent]
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
        const checked = hasCheckbox && dataKeyForCheckbox ? selectedIds.includes(item[dataKeyForCheckbox]) : false;
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
            data={currentData}
            components={VirtualTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={itemContent}
            {...tableProps}
        />
    );
}
