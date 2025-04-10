/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { StyledEngineProvider, createTheme, ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/** constants */
import { breakpoints } from '@module-theme/constants/breakpoints';
import { components } from '@module-theme/constants/components';
// import { palette } from '@module-theme/constants/palette';

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
