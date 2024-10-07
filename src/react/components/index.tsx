/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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
import CalendarProvider from '@module-calendar/components/CalendarProvider';
import SiderProvider from '@module-global/components/SiderProvider';

/** screens */
import MainScreen from '@module-global/screens/MainScreen';

/** global styles */
import './global.css';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <LanguageProvider>
                    <NotifyProvider>
                        <AuthProvider>
                            <CalendarProvider>
                                <SiderProvider>
                                    <MainScreen />
                                </SiderProvider>
                            </CalendarProvider>
                        </AuthProvider>
                    </NotifyProvider>
                </LanguageProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
