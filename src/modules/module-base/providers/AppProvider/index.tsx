/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

/** providers */
import NotifyProvider from '@module-base/providers/NotifyProvider';
import ThemeProvider from '@module-base/providers/ThemeProvider';
import LanguageProvider from '@module-base/providers/LanguageProvider';
import WindowProvider from '@module-base/providers/WindowProvider';

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

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <LanguageProvider>
                    <ThemeProvider>
                        <NotifyProvider>
                            <WindowProvider>{children}</WindowProvider>
                        </NotifyProvider>
                    </ThemeProvider>
                </LanguageProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
