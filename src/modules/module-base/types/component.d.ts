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

/** PasswordField */
export type TypePasswordFieldProps<Variant extends TextFieldProps['variant'] = 'outlined'> = TextFieldProps<Variant> & {
    setFocus?(): void;
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

/** ListBase */
export interface TypeListBaseProps<Data> extends Omit<ListProps, 'ref'> {
    ref?: Ref<{
        scrollTop(): void;
    }>;
    classNameContainer?: string;
    loading?: boolean;
    emptyContent?: string;
    data?: Data[];
    itemContent?(item: Data, index: number): ReactNode;
}
export interface TypeNestedItemProps {
    id: string;
    icon?: ReactNode;
    loading?: boolean;
    title?: ReactNode;
    divide?: 'top' | 'bottom' | 'top-bottom';
    subMenu?: TypeNestedItemProps[];
    subIndex?: number;
    onClick?(event: MouseEvent<HTMLDivElement>): void;
}

/** Virtual List */
export interface TypeVirtualListProps<Data, Context> extends VirtuosoProps<Data, Context> {
    loading?: boolean;
    emptyContent?: ReactNode;
    itemProps?: ListItemProps;
}

/** TableBase */
export type TypeOrderType = 'asc' | 'desc';
export type TypeTableData = Record<string | number, any> | any[];
export type TypeDataKey<Data extends TypeTableData> = Data extends any[] ? number : Extract<keyof Data, string | number>;
export interface TypeTableBaseProps<Data extends TypeTableData = TypeTableData> extends TableProps {
    data?: readonly Data[];
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: TypeDataKey<Data>;
    columns?: (Omit<TableCellProps, 'children'> & {
        dataKey: TypeDataKey<Data>;
        label: ReactNode;
        hasSort?: boolean;
        onClickItem?(
            event: MouseEvent<HTMLTableCellElement>,
            data: { indexRow: number; indexCell: number; item: Data }
        ): void;
        itemContent?(data: { indexRow: number; indexCell: number; item: Data }): ReactNode;
    })[];
    onChangeSelected?(arr: Array<Data[TypeDataKey<Data>]>): void;
}
export interface TypeTableHeaderProps<Data extends TypeTableData = TypeTableData> {
    columns?: TypeTableBaseProps<Data>['columns'];
    hasCheckbox?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    orderType?: TypeOrderType;
    orderBy?: TypeDataKey<Data>;
    onSort?(newKey: TypeDataKey<Data>, prevKey: TypeDataKey<Data>): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export interface TypeTableContentProps<Data extends TypeTableData = TypeTableData> {
    columns?: TypeTableBaseProps<Data>['columns'];
    hasCheckbox?: boolean;
    indexRow: number;
    item: Data;
    checked?: boolean;
    onSelect?(item: Data): void;
}
export interface TypeCheckboxColumnProps extends CheckboxProps {
    hasCheckbox?: boolean;
}

/** Virtual Table */
export interface TypeVirtualTableProps<Data extends TypeTableData, Context = any> extends TableVirtuosoProps<Data, Context> {
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: TypeDataKey<Data>;
    columns?: TypeTableBaseProps<Data>['columns'];
    onChangeSelected?(arr: Array<Data[TypeDataKey<Data>]>): void;
}
