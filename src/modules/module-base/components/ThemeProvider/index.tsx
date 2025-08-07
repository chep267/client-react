/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import {
    StyledEngineProvider,
    createTheme,
    ThemeProvider as ThemeProviderMUI,
    useColorScheme,
} from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

/** utils */
import { getDeviceTheme } from '@module-base/utils/getDeviceTheme';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

const defaultMode = getDeviceTheme();
const themeMUI = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    colorSchemes: {
        light: true,
        dark: true,
    },
    palette: {
        mode: defaultMode,
    },
});

function ThemeSubscriber(props: React.PropsWithChildren) {
    const { children } = props;
    const { mode, setMode } = useColorScheme();
    const theme = useSettingStore((store) => store.data.theme);

    React.useEffect(() => {
        setMode(theme);
    }, [theme]);

    return !mode ? null : children;
}

export default function ThemeProvider(props: React.PropsWithChildren) {
    const { children } = props;

    return (
        <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <ThemeProviderMUI theme={themeMUI} defaultMode={defaultMode}>
                <CssBaseline enableColorScheme />
                <ThemeSubscriber>{children}</ThemeSubscriber>
            </ThemeProviderMUI>
        </StyledEngineProvider>
    );
}
