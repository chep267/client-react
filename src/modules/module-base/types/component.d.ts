/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import {
    FunctionComponent,
    PropsWithChildren,
    LazyExoticComponent,
    RefObject,
    SVGProps,
    ImgHTMLAttributes,
    ReactNode,
    UIEvent,
    ErrorInfo,
    Ref,
    ChangeEvent,
} from 'react';

import type { TextFieldProps } from '@mui/material/TextField';
import type { ListProps } from '@mui/material/List';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { MenuProps } from '@mui/material/Menu';
import type { TableRowProps } from '@mui/material/TableRow';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TooltipProps } from '@mui/material/Tooltip';
import type { SnackbarProps } from '@mui/material/Snackbar';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { TableVirtuosoProps, VirtuosoProps } from 'react-virtuoso';
import type { ListItemProps } from '@mui/material/ListItem';
import type { TableProps } from '@mui/material/Table';
import type { ElementClickEvent } from './event.d';
import type { TableContainerProps } from '@mui/material/TableContainer';

export declare type TypeInputElem = HTMLInputElement | null;

/** ErrorBoundary */
export declare interface ErrorBoundaryProps extends PropsWithChildren {
    fallback?: FunctionComponent;
    isAutoReload?: boolean;
}
export declare interface ErrorBoundaryStates {
    hasError: boolean;
}
export declare interface FallbackDefaultProps {
    isAutoReload?: boolean;
}
export type { ErrorInfo };

/** IconBase */
export declare type IconSVGProps = SVGProps<SVGSVGElement>;
export declare type TypeIconBase = 'appLogo' | 'error' | 'notFound';
export declare interface IconBaseProps extends SVGProps<SVGSVGElement> {
    name: TypeIconBase;
    size?: number;
    ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
}
export declare type TypeIcons = Readonly<Record<TypeIconBase, LazyExoticComponent<(props: IconBaseProps) => JSX.Element>>>;

/** ImageBase */
export declare type ImageBaseProps = ImgHTMLAttributes<HTMLImageElement>;

/** InputSearch */
export declare interface InputSearchProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
    timer?: number;
    onLoading?(loading: boolean): void;
    onChangeValue?(value: string): void;
}

/** ListBase */
export declare interface ListBaseProps<D = any> extends Omit<ListProps, 'ref'> {
    ref?: Ref<{
        scrollTop(): void;
    }>;
    classNameContainer?: string;
    classNameLoading?: string;
    loading?: boolean;
    empty?: boolean;
    emptyText?: string;
    data?: D[];
    renderItem?(item: D, index: number): ReactNode;
}
export declare interface ListLoadingProps extends Pick<ListBaseProps, 'loading' | 'emptyText'> {
    className?: string;
    empty?: boolean;
}
export declare interface NestedItemProps {
    id: string;
    icon?: ReactNode;
    loading?: boolean;
    title?: ReactNode;
    divide?: 'top' | 'bottom' | 'top-bottom';
    subMenu?: NestedItemProps[];
    subIndex?: number;
    onClick?(event: ElementClickEvent<HTMLDivElement>): void;
}

/** MenuBase */
export declare interface MenuBaseProps {
    mode?: 'button' | 'icon';
    menuProps?: Omit<MenuProps, 'open'>;
    tooltipProps?: Omit<TooltipProps, 'children'>;
    iconButtonProps?: Omit<IconButtonProps, 'onClick' | 'children'>;
    buttonChildren?: TooltipProps['children'] | IconButtonProps['children'];
    menuChildren?: MenuProps['children'] | ((props: { closeMenu: () => void }) => MenuProps['children']);
}

/** NotifyBoundary */
export declare type NotifyBoundaryProps = Omit<SnackbarProps, 'open' | 'autoHideDuration' | 'anchorOrigin' | 'onClose'>;

/** PasswordField */
export declare interface PasswordFieldProps extends TextFieldProps {
    setFocus?(): void;
}

/** TableBase */
export declare type TypeOrderType = 'asc' | 'desc';
export declare type TableBaseProps<D = any> = TableProps & {
    data?: readonly D[];
    loading?: boolean;
    columns?: (Omit<TableCellProps, 'children'> & {
        dataKey: TypeDataKey<D>;
        hasSort?: boolean;
        label: TableCellProps['children'];
        onClickItem?(event: MouseEvent<HTMLTableCellElement, MouseEvent>, item: D): void;
        renderItem?(data: {
            dataKey: TypeDataKey<D>;
            indexRow: number;
            indexCell: number;
            item: D;
            value: D[TypeDataKey<D>];
        }): ReactNode;
    })[];
    slotProps?: {
        empty?: {
            className?: string;
            content?: string;
        };
    };
    onChangeSelected?(arr: Array<D[TypeDataKey<D>]>): void;
} & ({ hasCheckbox: true; dataKeyForCheckbox: TypeDataKey<D> } | { hasCheckbox?: false; dataKeyForCheckbox?: never });
export declare interface TableLoadingProps extends Pick<TableBaseProps, 'loading' | 'emptyText'> {
    empty?: boolean;
}
export declare interface TableHeaderProps<D extends TypeTableItemData>
    extends Pick<TableBaseProps<D>, 'className' | 'columns' | 'orderType' | 'orderBy' | 'hasCheckbox'> {
    checked?: boolean;
    indeterminate?: boolean;
    onSort?(newKey: TypeId, prevKey?: TypeId): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export declare type TableHeaderColumnsProps<D extends TypeTableItemData> = Pick<
    TableHeaderProps<D>,
    'columns' | 'orderBy' | 'orderType' | 'onSort'
>;
export declare interface TableContentProps<D extends TypeTableItemData>
    extends Pick<VirtualTableProps<D>, 'columns' | 'hasCheckbox' | 'dataKeyForCheckbox'> {
    indexRow: number;
    item: D;
    checked?: boolean;
    onSelect?(id: TypeId): void;
}
export declare interface TableContentColumnsProps<D extends TypeTableItemData>
    extends Omit<VirtualTableContentProps<D>, 'selected' | 'onSelect' | 'hasCheckbox'> {
    onSelect?(): void;
}

/** Virtual Table */
export type TypeDataKey<D> = Extract<keyof D, string | number>;
export declare type VirtualTableProps<D = any, C = any> = TableVirtuosoProps<D, C> & {
    loading?: boolean;
    columns?: (Omit<TableCellProps, 'children'> & {
        dataKey: TypeDataKey<D>;
        hasSort?: boolean;
        label: TableCellProps['children'];
        onClickItem?(event: MouseEvent<HTMLTableCellElement, MouseEvent>, item: D): void;
        renderItem?(data: {
            dataKey: TypeDataKey<D>;
            indexRow: number;
            indexCell: number;
            item: D;
            value: D[TypeDataKey<D>];
        }): ReactNode;
    })[];
    slotProps?: {
        empty?: {
            className?: string;
            content?: string;
        };
    };
    onChangeSelected?(arr: Array<D[TypeDataKey<D>]>): void;
} & ({ hasCheckbox: true; dataKeyForCheckbox: TypeDataKey<D> } | { hasCheckbox?: false; dataKeyForCheckbox?: never });
export declare interface VirtualTableHeaderProps<D = any, C = any>
    extends Pick<VirtualTableProps<D, C>, 'className' | 'columns' | 'hasCheckbox'> {
    checked?: boolean;
    indeterminate?: boolean;
    orderType?: TypeOrderType;
    orderBy?: TypeDataKey<D>;
    onSort?(newKey: TypeDataKey<D>, prevKey: TypeDataKey<D>): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export declare interface VirtualTableContentProps<D = any, C = any>
    extends Pick<VirtualTableProps<D, C>, 'columns' | 'hasCheckbox' | 'dataKeyForCheckbox'> {
    indexRow: number;
    item: D;
    checked?: boolean;
    onSelect?(item: D): void;
}
export declare type VirtualTableContainerProps = TableContainerProps & Pick<VirtualTableProps, 'loading'>;
export declare type VirtualTableEmptyProps = NonNullable<NonNullable<VirtualTableProps['slotProps']>['empty']>;
export declare type VirtualTableLoadingProps = Pick<VirtualTableProps, 'loading'>;
export declare interface CheckboxColumnProps extends CheckboxProps {
    hasCheckbox?: boolean;
}

/** Virtual List */
export declare type TypeVirtualListItemData = any;
export declare interface VirtualListProps<D extends TypeVirtualListItemData, C = any> extends VirtuosoProps<D, C> {
    className?: string;
    headerContent?: () => ReactNode;
    footerContent?: () => ReactNode;
    slotProps?: {
        listItem?: ListItemProps;
        listEmpty?: {
            className?: string;
            emptyText?: string;
        };
        listLoading?: {
            className?: string;
            loading?: boolean;
        };
        header?: any;
        footer?: any;
    };
}
export declare type VirtualListLoadingProps = NonNullable<NonNullable<VirtualListProps['slotProps']>['listLoading']>;
export declare type VirtualListEmptyProps = NonNullable<NonNullable<VirtualListProps['slotProps']>['listEmpty']>;
