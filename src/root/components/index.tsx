/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** providers */
import AppProvider from '@module-base/components/AppProvider';

/** screens */
import MainScreen from '@module-global/screens/MainScreen';

/** styles */
import '@root/components/main.css';

export default function App() {
    return (
        <AppProvider>
            <MainScreen />
        </AppProvider>
    );
}
