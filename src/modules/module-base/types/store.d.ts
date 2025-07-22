/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ReactNode } from 'react';
import type { AlertColor } from '@mui/material/Alert';
import type { PaletteMode } from '@mui/material/styles';
import type { SnackbarOrigin } from '@mui/material/Snackbar';

export type TypeLocale = 'vi' | 'en';
export type TypeLanguageMessages = Record<string, string>;
export type TypeTheme = PaletteMode;
export type TypeSiderState = 'collapse' | 'expand' | 'hidden' | 'force';

/** Setting store */
type TypeNotifyData = {
    open?: boolean;
    message?: ReactNode;
    messageIntl?: string;
    color?: AlertColor;
    duration?: number;
    anchorOrigin?: SnackbarOrigin;
    top?: number | string;
};
type TypeSettingData = {
    locale: TypeLocale;
    theme: TypeTheme;
    sider: TypeSiderState;
    notify: TypeNotifyData;
};
type TypeSettingAction = {
    changeLocale: (locale?: TypeLocale) => void;
    changeTheme: (theme?: TypeTheme) => void;
    changeSider: (sider?: TypeSiderState) => void;
    changeNotify: (data?: Partial<TypeNotifyData>) => void;
};
export type TypeSettingStore = {
    data: TypeSettingData;
    action: TypeSettingAction;
};
