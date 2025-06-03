/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type {
    FunctionComponent,
    PropsWithChildren,
    LazyExoticComponent,
    RefObject,
    SVGProps,
    ImgHTMLAttributes,
    ReactNode,
    Ref,
    ChangeEvent,
    MouseEvent,
} from 'react';
import type { TextFieldProps } from '@mui/material/TextField';
import type { ListProps } from '@mui/material/List';
import type { ButtonProps } from '@mui/material/Button';
import type { MenuProps } from '@mui/material/Menu';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TooltipProps } from '@mui/material/Tooltip';
import type { SnackbarProps } from '@mui/material/Snackbar';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { TableVirtuosoProps, VirtuosoProps } from 'react-virtuoso';
import type { ListItemProps } from '@mui/material/ListItem';
import type { TableProps } from '@mui/material/Table';

export type TypeInputElem = HTMLInputElement | null;

/** ErrorBoundary */
export interface TypeErrorBoundaryProps extends PropsWithChildren {
    fallback?: FunctionComponent;
    isAutoReload?: boolean;
}
export interface TypeErrorBoundaryStates {
    hasError: boolean;
}
export interface TypeFallbackDefaultProps {
    isAutoReload?: boolean;
}

/** Sider */
export type TypeSiderProviderProps = PropsWithChildren;

/** Notify */
export type TypeNotifyProviderProps = PropsWithChildren;

/** IconBase */
type TypeIconBase = 'appLogo' | 'error' | 'notFound';
export type TypeIconSVGProps = SVGProps<SVGSVGElement>;
export interface TypeIconBaseProps extends SVGProps<SVGSVGElement> {
    name: TypeIconBase;
    size?: number;
    ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
}
export type TypeIconList = Readonly<Record<TypeIconBase, LazyExoticComponent<(props: IconBaseProps) => JSX.Element>>>;

/** ImageBase */
export type TypeImageBaseProps = ImgHTMLAttributes<HTMLImageElement>;

/** InputSearch */
export type TypeInputSearchProps<Variant extends TextFieldProps['variant'] = 'outlined'> = Omit<
    TextFieldProps<Variant>,
    'value'
> & {
    timer?: number;
    onLoading?(loading: boolean): void;
    onChangeValue?(value: string): void;
};

/** MenuBase */
export interface TypeMenuBaseProps {
    mode?: 'button' | 'icon';
    menuProps?: Omit<MenuProps, 'open'>;
    tooltipProps?: Omit<TooltipProps, 'children'>;
    buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
    buttonChildren?: TooltipProps['children'] | ButtonProps['children'];
    menuChildren?: MenuProps['children'] | ((props: { closeMenu: () => void }) => MenuProps['children']);
}

/** NotifyBoundary */
export type TypeNotifyBoundaryProps = Omit<SnackbarProps, 'open' | 'autoHideDuration' | 'anchorOrigin' | 'onClose'>;

/** PasswordField */
export type PasswordFieldProps<Variant extends TextFieldProps['variant'] = 'outlined'> = TextFieldProps<Variant> & {
    setFocus?(): void;
};

/** ListBase */
export interface ListBaseProps<D> extends Omit<ListProps, 'ref'> {
    ref?: Ref<{
        scrollTop(): void;
    }>;
    classNameContainer?: string;
    loading?: boolean;
    emptyContent?: string;
    data?: D[];
    itemContent?(item: D, index: number): ReactNode;
}
export interface NestedItemProps {
    id: string;
    icon?: ReactNode;
    loading?: boolean;
    title?: ReactNode;
    divide?: 'top' | 'bottom' | 'top-bottom';
    subMenu?: NestedItemProps[];
    subIndex?: number;
    onClick?(event: MouseEvent<HTMLDivElement>): void;
}

/** Virtual List */
export interface VirtualListProps<D, C> extends VirtuosoProps<D, C> {
    loading?: boolean;
    emptyContent?: ReactNode;
    itemProps?: ListItemProps;
}

/** TableBase */
export type TypeOrderType = 'asc' | 'desc';
export type TypeTableData = Record<string | number, any> | any[];
export type TypeDataKey<D extends TypeTableData> = D extends any[] ? number : Extract<keyof D, string | number>;
export interface TableBaseProps<D extends TypeTableData = TypeTableData> extends TableProps {
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
export interface TableHeaderProps<D extends TypeTableData = TypeTableData> {
    columns?: TableBaseProps<D>['columns'];
    hasCheckbox?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    orderType?: TypeOrderType;
    orderBy?: TypeDataKey<D>;
    onSort?(newKey: TypeDataKey<D>, prevKey: TypeDataKey<D>): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export interface TableContentProps<D extends TypeTableData = TypeTableData> {
    columns?: TableBaseProps<D>['columns'];
    hasCheckbox?: boolean;
    indexRow: number;
    item: D;
    checked?: boolean;
    onSelect?(item: D): void;
}
export interface CheckboxColumnProps extends CheckboxProps {
    hasCheckbox?: boolean;
}

/** Virtual Table */
export interface VirtualTableProps<D extends TypeTableData, C = any> extends TableVirtuosoProps<D, C> {
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: TypeDataKey<D>;
    columns?: TableBaseProps<D>['columns'];
    onChangeSelected?(arr: Array<D[TypeDataKey<D>]>): void;
}
