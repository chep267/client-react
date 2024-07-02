/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { themeObject } from '@module-theme/constants/themeObject.ts';

/** types */
import type { Theme } from '@mui/material/styles';

export const components = {
    MuiAppBar: {
        styleOverrides: {
            root: ({ theme }: { theme: Theme }) => ({
                color: theme.palette.mode === themeObject.light ? '#038cf5' : '',
                backgroundColor: theme.palette.mode === themeObject.light ? '#f0f2f5' : '',
            }),
        },
    },
};
