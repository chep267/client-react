/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import Cookies from 'js-cookie';

/** lib components */
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery, createTheme, ThemeProvider as ThemeProviderMUI } from '@mui/material';

/** constants */
import { AppKey } from '@module-base/constants';
import { themeObject, breakpoints, palette, ThemeContext, components } from '@module-theme/constants';

/** types */
import type { PropsWithChildren } from 'react';
import type { ThemeOptions } from '@mui/material';
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
