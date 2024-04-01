/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';

/** lib components */
import { StyledEngineProvider, createTheme, ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';
import { themeObject } from '@module-theme/constants/themeObject.ts';
import { breakpoints } from '@module-theme/constants/breakpoints.ts';
import { palette } from '@module-theme/constants/palette.ts';
import { ThemeContext } from '@module-theme/constants/ThemeContext.ts';
import { components } from '@module-theme/constants/components.ts';

/** types */
import type { PropsWithChildren } from 'react';
import type { ThemeOptions } from '@mui/material/styles';
import type { TypeThemeMode, ThemeContextProps } from '@module-theme/models';

export default function ThemeProvider(props: PropsWithChildren) {
    const { children } = props;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themeOptions = React.useRef({
        dark: { palette: palette.dark, breakpoints, components },
        light: { palette: palette.light, breakpoints, components },
    }).current;

    const [mode, setMode] = React.useState<TypeThemeMode>(() => {
        const modeLocal = Cookies.get(AppKey.theme) as TypeThemeMode;
        if (modeLocal && modeLocal in themeObject) {
            return modeLocal;
        }
        return prefersDarkMode ? themeObject.dark : themeObject.light;
    });

    const setTheme = React.useCallback<ThemeContextProps['method']['setTheme']>((value) => {
        Cookies.set(AppKey.theme, value);
        setMode(value);
    }, []);

    const store = React.useMemo<ThemeContextProps>(() => {
        return {
            data: { mode },
            method: { setTheme },
        };
    }, [mode]);

    const theme = createTheme(themeOptions[mode] as ThemeOptions);

    return (
        <ThemeContext.Provider value={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProviderMUI theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProviderMUI>
            </StyledEngineProvider>
        </ThemeContext.Provider>
    );
}
