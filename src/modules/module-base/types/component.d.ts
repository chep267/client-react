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
import type { ElementClickEvent } from './event.d';
import type { ListItemProps } from '@mui/material/ListItem';

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
export declare interface ListBaseProps<T = any> extends Omit<ListProps, 'ref'> {
    ref?: Ref<{
        scrollTop(): void;
    }>;
    classNameContainer?: string;
    classNameLoading?: string;
    loading?: boolean;
    empty?: boolean;
    emptyText?: string;
    data?: T[];
    renderItem?(item: T, index: number): ReactNode;
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
export declare interface TableBaseProps<T = any> {
    className?: string;
    sx?: any;

    data?: T[];
    onScroll?(event: UIEvent<HTMLDivElement>): void;
    onClickItem?(item: T): void;

    loading?: boolean;
    emptyText?: string;

    rows?: {
        id: string;
        label: ReactNode;
        isSort?: boolean;
        render(item: T, indexRow: number, indexCell: number): ReactNode;
    }[];
    orderType?: TypeOrderType;
    orderBy?: string;
    onSort?(property: string): void;

    tableRowProps?: TableRowProps;
    tableCellProps?: TableCellProps;
}
export declare type TableLoadingProps = Pick<TableBaseProps, 'loading' | 'emptyText'> & { empty?: boolean };
export declare type TableHeaderProps = Pick<
    TableBaseProps,
    'rows' | 'orderBy' | 'orderType' | 'onSort' | 'tableRowProps' | 'tableCellProps'
>;
export declare type TableBodyProps = Pick<
    TableBaseProps,
    'data' | 'onClickItem' | 'rows' | 'tableRowProps' | 'tableCellProps'
>;

/** Virtual Table */
export declare type TypeId = string | number;
export declare type TypeVirtualItemData<T = Record<string, any>> = TypeId | ({ id: TypeId } & T);
export declare interface VirtualTableProps extends TableVirtuosoProps<TypeVirtualItemData, any> {
    className?: string;
    headerClassName?: string;
    columns?: (Omit<TableCellProps, 'children'> & {
        dataKey: string;
        className?: string;
        hasSort?: boolean;
        label: TableCellProps['children'];
        renderItem?(data: { item: T; indexRow: number; indexCell: number; dataKey: string; value: any }): ReactNode;
    })[];
    orderType?: TypeOrderType;
    orderBy?: string;
    selectedIds?: Array<TypeId>;
    hasCheckbox?: boolean;
    onChangeOrder?(data: { type?: TypeOrderType; key?: string }): void;
    onChangeSelected?(arr: Array<TypeId>): void;
}
export declare interface VirtualTableHeaderProps
    extends Pick<VirtualTableProps, 'columns' | 'orderType' | 'orderBy' | 'hasCheckbox'> {
    className?: string;
    checked?: boolean;
    indeterminate?: boolean;
    onSort?(newKey: string, prevKey?: string): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export declare type HeaderColumnsProps = Pick<VirtualTableHeaderProps, 'columns' | 'orderBy' | 'orderType' | 'onSort'>;
export declare interface VirtualTableContentProps<T = TypeVirtualItemData>
    extends Pick<VirtualTableProps, 'columns' | 'hasCheckbox'> {
    indexRow: number;
    item: T;
    checked?: boolean;
    onSelect?(id: TypeId): void;
}
export declare interface ContentColumnsProps extends Omit<VirtualTableContentProps, 'selected' | 'onSelect'> {
    onSelect?(): void;
}
export declare interface CheckboxColumnProps extends CheckboxProps {
    hasCheckbox?: boolean;
}

/** Virtual List */
export declare interface VirtualListProps<D extends TypeVirtualItemData, C = any> extends VirtuosoProps<D, C> {
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
