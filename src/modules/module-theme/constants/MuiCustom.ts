/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { ThemeObject } from '@module-theme/constants/ThemeObject';

/** types */
import type { Theme } from '@mui/material/styles';

export const components = {
    MuiAppBar: {
        styleOverrides: {
            root: ({ theme }: { theme: Theme }) => ({
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.mode === ThemeObject.light ? theme.palette.grey.A100 : '',
            }),
        },
    },
};

export const breakpoints = {
    values: {
        xs: 567,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
        mobile: 480,
        tablet: 640,
        laptop: 1024,
        desktop: 1408,
    },
};
