/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

/** constants */
import { AppScreenSize } from '@module-base/constants/AppScreenSize';
import { AppSiderState } from '@module-base/constants/AppSiderState';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** providers */
import ErrorBoundary from '@module-base/providers/ErrorBoundary';
import ThemeProvider from '@module-base/providers/ThemeProvider';
import LanguageProvider from '@module-base/providers/LanguageProvider';

/** Create a client */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchInterval: false,
            refetchOnReconnect: false,
            retryDelay: 1000,
        },
    },
});

export default function AppProvider(props: React.PropsWithChildren) {
    const { children } = props;

    const isForce = useMediaQuery(`(max-width:${AppScreenSize.AppbarCollapseBreakpoint}px)`);
    const isHidden = useMediaQuery(`(max-width:${AppScreenSize.AppbarHiddenBreakpoint}px)`);
    const sider = useSettingStore((store) => store.data.sider);
    const settingAction = useSettingStore((store) => store.action);
    const lastState = React.useRef<App.ModuleBase.Store.SiderState>(sider);

    /** sider event */
    React.useEffect(() => {
        if (sider === AppSiderState.expand || sider === AppSiderState.collapse) {
            lastState.current = sider;
        }
        switch (true) {
            case isHidden:
                settingAction.changeSider(AppSiderState.hidden);
                break;
            case isForce:
                settingAction.changeSider(AppSiderState.force);
                break;
            default:
                settingAction.changeSider(lastState.current);
        }
    }, [isForce, isHidden]);

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <ThemeProvider>
                    <ErrorBoundary>
                        <BrowserRouter>{children}</BrowserRouter>
                    </ErrorBoundary>
                </ThemeProvider>
            </LanguageProvider>
        </QueryClientProvider>
    );
}
