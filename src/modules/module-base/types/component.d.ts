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
    ErrorInfo,
    Ref,
    ChangeEvent,
} from 'react';

import type { TextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import type { ListProps } from '@mui/material/List';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { MenuProps } from '@mui/material/Menu';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TooltipProps } from '@mui/material/Tooltip';
import type { SnackbarProps } from '@mui/material/Snackbar';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { TableVirtuosoProps, VirtuosoProps } from 'react-virtuoso';
import type { ListItemProps } from '@mui/material/ListItem';
import type { TableProps } from '@mui/material/Table';
import type { ElementClickEvent } from './event.d';

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
export type { ErrorInfo, TextFieldVariants };

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
export declare type InputSearchProps<Variant extends TextFieldProps['variant'] = 'outlined'> = Omit<
    TextFieldProps<Variant>,
    'value'
> & {
    timer?: number;
    onLoading?(loading: boolean): void;
    onChangeValue?(value: string): void;
};

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
export declare type PasswordFieldProps<Variant extends TextFieldProps['variant'] = 'outlined'> = TextFieldProps<Variant> & {
    setFocus?(): void;
};

/** ListBase */
export declare interface ListBaseProps<D> extends Omit<ListProps, 'ref'> {
    ref?: Ref<{
        scrollTop(): void;
    }>;
    classNameContainer?: string;
    loading?: boolean;
    emptyContent?: string;
    data?: D[];
    itemContent?(item: D, index: number): ReactNode;
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

/** Virtual List */
export declare interface VirtualListProps<D, C> extends VirtuosoProps<D, C> {
    loading?: boolean;
    emptyContent?: ReactNode;
    itemProps?: ListItemProps;
}

/** TableBase */
export declare type TypeOrderType = 'asc' | 'desc';
export declare type TypeTableData = Record<string | number, any> | any[];
export declare type TypeDataKey<D extends TypeTableData> = D extends any[] ? number : Extract<keyof D, string | number>;
export declare interface TableBaseProps<D extends TypeTableData = TypeTableData> extends TableProps {
    data?: readonly D[];
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: TypeDataKey<D>;
    columns?: (Omit<TableCellProps, 'children'> & {
        dataKey: TypeDataKey<D>;
        label: ReactNode;
        hasSort?: boolean;
        onClickItem?(event: MouseEvent<HTMLTableCellElement>, data: { indexRow: number; indexCell: number; item: D }): void;
        itemContent?(data: { indexRow: number; indexCell: number; item: D }): ReactNode;
    })[];
    onChangeSelected?(arr: Array<D[TypeDataKey<D>]>): void;
}
export declare interface TableHeaderProps<D extends TypeTableData = TypeTableData> {
    columns?: TableBaseProps<D>['columns'];
    hasCheckbox?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    orderType?: TypeOrderType;
    orderBy?: TypeDataKey<D>;
    onSort?(newKey: TypeDataKey<D>, prevKey: TypeDataKey<D>): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export declare interface TableContentProps<D extends TypeTableData = TypeTableData> {
    columns?: TableBaseProps<D>['columns'];
    hasCheckbox?: boolean;
    indexRow: number;
    item: D;
    checked?: boolean;
    onSelect?(item: D): void;
}
export declare interface CheckboxColumnProps extends CheckboxProps {
    hasCheckbox?: boolean;
}

/** Virtual Table */
export declare interface VirtualTableProps<D extends TypeTableData, C = any> extends TableVirtuosoProps<D, C> {
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: TypeDataKey<D>;
    columns?: TableBaseProps<D>['columns'];
    onChangeSelected?(arr: Array<D[TypeDataKey<D>]>): void;
}
