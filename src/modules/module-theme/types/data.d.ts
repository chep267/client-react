/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { PaletteMode, Theme } from '@mui/material/styles';

export type TypeThemeMode = PaletteMode;

export type TypeTheme = Theme;

export type ThemeContextProps = {
    data: {
        mode: TypeThemeMode;
    };
    method: {
        setTheme(value: TypeThemeMode): void;
    };
};
