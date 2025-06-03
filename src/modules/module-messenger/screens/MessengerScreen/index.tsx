/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

/** constants */
import { MessengerRouterPath } from '@module-messenger/constants/MessengerRouterPath';

/** screens */
const NotFoundScreen = React.lazy(() => import('@module-base/screens/NotFoundScreen'));
const ConversationScreen = React.lazy(() => import('@module-messenger/screens/ConversationScreen'));

export default function MessengerScreen() {
    return (
        <React.Suspense fallback={null}>
            <Routes>
                <Route index element={<ConversationScreen />} />
                <Route path={MessengerRouterPath.conversation} element={<ConversationScreen />} />
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
        </React.Suspense>
    );
}
