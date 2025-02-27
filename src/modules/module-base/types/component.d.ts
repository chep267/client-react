/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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
    UIEvent,
    ElementType,
    ErrorInfo,
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
import type { ElementClickEvent } from './event.d';

export type TypeInputElem = HTMLInputElement | null;

/** ErrorBoundary */
export type ErrorBoundaryProps = PropsWithChildren<{
    fallback?: FunctionComponent;
    isAutoReload?: boolean;
}>;
export type ErrorBoundaryStates = {
    hasError: boolean;
};
export type FallbackDefaultProps = {
    isAutoReload?: boolean;
};
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
export type InputSearchProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
    timer?: number;
    onLoading?(loading: boolean): void;
    onChangeValue?(value: string): void;
};

/** ListBase */
export interface ListBaseProps<T = unknown> extends ListProps {
    listRef?: ListProps['ref'];
    containerClassName?: string;
    loading?: boolean;
    empty?: boolean;
    emptyText?: string;
    data?: T[];
    renderItem?(item: T, index: number): ReactNode;
}
export type ListLoadingProps = Pick<ListBaseProps, 'loading' | 'emptyText'> & { empty?: boolean };
export type NestedItemProps = {
    id: string;
    icon?: ReactNode;
    loading?: boolean;
    title?: ReactNode;
    divide?: 'top' | 'bottom' | 'top-bottom';
    subMenu?: NestedItemProps[];
    subIndex?: number;
    onClick?(event: ElementClickEvent<HTMLDivElement>, isExpand?: boolean): void;
};

/** MenuBase */
export type MenuBaseProps = PropsWithChildren<{
    mode?: 'button' | 'icon';
    menuProps?: Omit<MenuProps, 'open'>;
    tooltipProps?: Omit<TooltipProps, 'children'>;
    iconButtonProps?: Omit<IconButtonProps, 'onClick' | 'children'>;
    buttonChildren?: TooltipProps['children'] | IconButtonProps['children'];
    menuChildren?: MenuProps['children'] | ((props: { closeMenu: () => void }) => MenuProps['children']);
}>;

/** NotifyBoundary */
export type NotifyBoundaryProps = Omit<SnackbarProps, 'open' | 'autoHideDuration' | 'anchorOrigin' | 'onClose'>;

/** PasswordField */
export type PasswordFieldProps = TextFieldProps & {
    setFocus?(): void;
};

/** TableBase */
type OrderType = 'asc' | 'desc';
export interface TableBaseProps<T = unknown> {
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
    orderType?: OrderType;
    orderBy?: string;
    onRequestSort?(property: string): void;

    tableRowProps?: TableRowProps;
    tableCellProps?: TableCellProps;
}
export type TableLoadingProps = Pick<TableBaseProps, 'loading' | 'emptyText'> & { empty?: boolean };
export type TableHeaderProps = Pick<
    TableBaseProps,
    'rows' | 'orderBy' | 'orderType' | 'onRequestSort' | 'tableRowProps' | 'tableCellProps'
>;
export type TableBodyProps = Pick<TableBaseProps, 'data' | 'onClickItem' | 'rows' | 'tableRowProps' | 'tableCellProps'>;

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
