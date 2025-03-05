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
    ElementType,
    ErrorInfo,
    Ref,
    ChangeEvent,
} from 'react';

import type { TextFieldProps } from '@mui/material/TextField';
import type { ListProps } from '@mui/material/List';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { MenuProps } from '@mui/material/Menu';
import type { SelectProps } from '@mui/material/Select';
import type { TableRowProps } from '@mui/material/TableRow';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TooltipProps } from '@mui/material/Tooltip';
import type { SnackbarProps } from '@mui/material/Snackbar';
import type { Theme, SxProps } from '@mui/material/styles';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { ElementClickEvent } from './event.d';

export type TypeInputElem = HTMLInputElement | null;

/** ErrorBoundary */
export interface ErrorBoundaryProps extends PropsWithChildren {
    fallback?: FunctionComponent;
    isAutoReload?: boolean;
}
export interface ErrorBoundaryStates {
    hasError: boolean;
}
export interface FallbackDefaultProps {
    isAutoReload?: boolean;
}
export type { ErrorInfo };

/** IconBase */
export type IconSVGProps = SVGProps<SVGSVGElement>;
export type TypeIconBase = 'appLogo' | 'error' | 'notFound';
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
    name: TypeIconBase;
    size?: number;
    ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
}
export type TypeIcons = Readonly<Record<TypeIconBase, LazyExoticComponent<(props: IconBaseProps) => JSX.Element>>>;

/** ImageBase */
export type ImageBaseProps = ImgHTMLAttributes<HTMLImageElement>;

/** InputSearch */
export interface InputSearchProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
    timer?: number;
    onLoading?(loading: boolean): void;
    onChangeValue?(value: string): void;
}

/** ListBase */
export interface ListBaseProps<T = any> extends Omit<ListProps, 'ref'> {
    ref?: Ref<{
        scrollTop(): void;
    }>;
    containerClassName?: string;
    loading?: boolean;
    empty?: boolean;
    emptyText?: string;
    data?: T[];
    renderItem?(item: T, index: number): ReactNode;
}
export interface ListLoadingProps extends Pick<ListBaseProps, 'loading' | 'emptyText'> {
    empty?: boolean;
}
export interface NestedItemProps {
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
export interface MenuBaseProps {
    mode?: 'button' | 'icon';
    menuProps?: Omit<MenuProps, 'open'>;
    tooltipProps?: Omit<TooltipProps, 'children'>;
    iconButtonProps?: Omit<IconButtonProps, 'onClick' | 'children'>;
    buttonChildren?: TooltipProps['children'] | IconButtonProps['children'];
    menuChildren?: MenuProps['children'] | ((props: { closeMenu: () => void }) => MenuProps['children']);
}

/** NotifyBoundary */
export type NotifyBoundaryProps = Omit<SnackbarProps, 'open' | 'autoHideDuration' | 'anchorOrigin' | 'onClose'>;

/** PasswordField */
export interface PasswordFieldProps extends TextFieldProps {
    setFocus?(): void;
}

/** TableBase */
export type TypeOrderType = 'asc' | 'desc';
export interface TableBaseProps<T = any> {
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
export type TableLoadingProps = Pick<TableBaseProps, 'loading' | 'emptyText'> & { empty?: boolean };
export type TableHeaderProps = Pick<
    TableBaseProps,
    'rows' | 'orderBy' | 'orderType' | 'onSort' | 'tableRowProps' | 'tableCellProps'
>;
export type TableBodyProps = Pick<TableBaseProps, 'data' | 'onClickItem' | 'rows' | 'tableRowProps' | 'tableCellProps'>;

export interface VirtualTableProps<T = any> {
    className?: string;
    headerClassName?: string;
    data?: T[];
    columns?: (Omit<TableCellProps, 'children'> & {
        dataKey: string;
        className?: string;
        hasSort?: boolean;
        label: TableCellProps['children'];
        renderItem?(data: { item: T; indexRow: number; indexCell: number; dataKey: string; value: any }): ReactNode;
    })[];

    orderType?: TypeOrderType;
    orderBy?: string;
    selectedIds?: Array<string | number>;
    hasCheckbox?: boolean;
    onChangeOrder?(data: { type: TypeOrderType; key: string }): void;
    onChangeSelected?(arr: Array<string | number>): void;
}
export interface VirtualTableHeaderProps
    extends Pick<VirtualTableProps, 'columns' | 'orderType' | 'orderBy' | 'hasCheckbox'> {
    className?: string;
    totalItems?: number;
    totalSelectedItems?: number;
    onSort?(newKey: string, prevKey?: string): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export interface VirtualTableContentProps<T = any> extends Pick<VirtualTableProps, 'columns' | 'hasCheckbox'> {
    indexRow: number;
    item: T;
    selected?: boolean;
}
export interface CheckboxColumnProps extends CheckboxProps {
    hasCheckbox?: boolean;
}

/** SelectBase */
export interface SelectBaseProps extends SelectProps {
    labelInValue?: string;
    menuItems?: { value: string | number; label: ReactNode }[];
    IconRightProps?: {
        disableClear?: boolean;
        sx?: SxProps<Theme>;
        Icon?: ElementType;
        onClick?(): void;
    };
}
