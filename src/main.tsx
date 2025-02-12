/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import ReactDOM from 'react-dom/client';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';

/** components */
import App from '@root/components';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
if (AppEnv.appMode === 'dev') {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else root.render(<App />);
