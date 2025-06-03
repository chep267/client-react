/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { themeObject } from '@module-theme/constants/themeObject';

/** types */
import type { Palette, PaletteMode } from '@mui/material/styles';

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export const createGradient = (color1: string, color2: string) => {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
};

export const palette: Record<PaletteMode, DeepPartial<Palette>> = {
    light: {
        mode: themeObject.light,
    },
    dark: {
        mode: themeObject.dark,
    },
};
