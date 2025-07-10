/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** providers */
import ErrorBoundary from '@module-base/components/ErrorBoundary';
import ThemeProvider from '@module-base/components/ThemeProvider';
import LanguageProvider from '@module-base/components/LanguageProvider';
import AppProvider from '@module-base/components/AppProvider';

/** screens */
import MainScreen from '@module-global/screens/MainScreen';

/** styles */
import '@root/components/main.css';

export default function App() {
    return (
        <AppProvider>
            <LanguageProvider>
                <ThemeProvider>
                    <ErrorBoundary>
                        <MainScreen />
                    </ErrorBoundary>
                </ThemeProvider>
            </LanguageProvider>
        </AppProvider>
    );
}
