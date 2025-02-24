/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';
import { StyledEngineProvider, createTheme, ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { themeObject } from '@module-theme/constants/themeObject';
import { breakpoints } from '@module-theme/constants/breakpoints';
import { palette } from '@module-theme/constants/palette';
import { components } from '@module-theme/constants/components';

/** contexts */
import { ThemeContext } from '@module-theme/contexts/ThemeContext';

/** types */
import type { PropsWithChildren } from 'react';
import type { ThemeOptions } from '@mui/material/styles';
import type { TypeThemeMode, ThemeContextProps } from '@module-theme/types';

export default function ThemeProvider(props: PropsWithChildren) {
    const { children } = props;

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themeOptions = React.useRef({
        dark: { palette: palette.dark, breakpoints, components },
        light: { palette: palette.light, breakpoints, components },
    }).current;

    const [mode, setMode] = React.useState<TypeThemeMode>(() => {
        const modeLocal = Cookies.get(AppKey.theme) as TypeThemeMode;
        if (modeLocal in themeObject) {
            return modeLocal;
        }
        return prefersDarkMode ? themeObject.dark : themeObject.light;
    });

    React.useEffect(() => {
        if (mode === themeObject.dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

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
                    <CssBaseline enableColorScheme />
                    {children}
                </ThemeProviderMUI>
            </StyledEngineProvider>
        </ThemeContext.Provider>
    );
}
