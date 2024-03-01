/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { PaletteMode } from '@mui/material';

export type TypeThemeMode = PaletteMode;

export type ThemeContextProps = {
    data: {
        mode: TypeThemeMode;
    };
    method: {
        setTheme: (value: TypeThemeMode) => void;
    };
};
