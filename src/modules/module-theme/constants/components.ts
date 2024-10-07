/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { themeObject } from '@module-theme/constants/themeObject';

/** types */
import type { Theme } from '@mui/material/styles';

export const components = {
    MuiAppBar: {
        styleOverrides: {
            root: ({ theme }: { theme: Theme }) => ({
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.mode === themeObject.light ? theme.palette.grey.A100 : '',
            }),
        },
    },
};
