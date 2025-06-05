/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { StyledEngineProvider, createTheme, ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/** constants */
import { breakpoints, components } from '@module-theme/constants/MuiCustom';

/** types */
import type { PropsWithChildren } from 'react';

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    colorSchemes: {
        light: true,
        dark: true,
    },
    breakpoints,
    components,
});

export default function ThemeProvider(props: PropsWithChildren) {
    const { children } = props;

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProviderMUI theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProviderMUI>
        </StyledEngineProvider>
    );
}
