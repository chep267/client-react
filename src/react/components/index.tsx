/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { QueryClientProvider } from '@tanstack/react-query';

/** utils */
import { queryClient } from '@root/utils/queryClient.ts';

/** providers */
import { NotifyProvider } from '@module-base/components';
import { ThemeProvider } from '@module-theme/components';
import { LanguageProvider } from '@module-language/components';
import { AuthProvider } from '@module-auth/components';

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
                            <MainScreen />
                        </AuthProvider>
                    </NotifyProvider>
                </LanguageProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
