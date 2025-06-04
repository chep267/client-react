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
import NotifyProvider from '@module-base/components/NotifyProvider';
import ThemeProvider from '@module-theme/components/ThemeProvider';
import LanguageProvider from '@module-language/components/LanguageProvider';
import AuthProvider from '@module-auth/components/AuthProvider';
import SiderProvider from '@module-base/components/SiderProvider';

/** screens */
import MainScreen from '@module-global/screens/MainScreen';

/** styles */
import '@root/components/main.css';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <LanguageProvider>
                    <NotifyProvider>
                        <AuthProvider>
                            <SiderProvider>
                                <MainScreen />
                            </SiderProvider>
                        </AuthProvider>
                    </NotifyProvider>
                </LanguageProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
