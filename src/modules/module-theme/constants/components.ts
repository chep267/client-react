/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */
import { Theme } from '@mui/material';

export const components = {
    MuiAppBar: {
        styleOverrides: {
            root: ({ theme }: { theme: Theme }) => ({
                color: theme.palette.mode === 'light' ? '#038cf5' : '',
                backgroundColor: theme.palette.mode === 'light' ? '#f0f2f5' : '',
            }),
        },
    },
};
