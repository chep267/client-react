/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/** constants */
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-global/screens/NotFoundScreen'));
const ConversationScreen = React.lazy(() => import('../ConversationScreen'));

export default function MessengerScreen() {
    return (
        <React.Suspense fallback={null}>
            <Routes>
                <Route index element={<Navigate to={GlobalRouterPath.messenger} />} />
                <Route path={GlobalRouterPath.messenger} element={<ConversationScreen />} />
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </React.Suspense>
    );
}
