/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import ReactDOM from 'react-dom/client';

/** providers */
import AppProvider from '@module-base/components/AppProvider';

/** screens */
import MainScreen from '@module-global/screens/MainScreen';

/** styles */
import '@src/main.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <AppProvider>
            <MainScreen />
        </AppProvider>
    </React.StrictMode>
);
