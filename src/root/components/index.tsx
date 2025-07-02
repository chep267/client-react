/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { QueryClientProvider } from '@tanstack/react-query';

/** utils */
import { queryClient } from '@root/utils/queryClient';

/** providers */
import ErrorBoundary from '@module-base/components/ErrorBoundary';
import ThemeProvider from '@module-base/components/ThemeProvider';
import LanguageProvider from '@module-base/components/LanguageProvider';
import AuthProvider from '@module-auth/components/AuthProvider';
import SiderProvider from '@module-base/components/SiderProvider';

/** screens */
import MainScreen from '@module-global/screens/MainScreen';

/** styles */
import '@root/components/main.css';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <ThemeProvider>
                    <ErrorBoundary>
                        <AuthProvider>
                            <SiderProvider>
                                <MainScreen />
                            </SiderProvider>
                        </AuthProvider>
                    </ErrorBoundary>
                </ThemeProvider>
            </LanguageProvider>
        </QueryClientProvider>
    );
}
