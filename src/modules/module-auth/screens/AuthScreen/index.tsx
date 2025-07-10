/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** screens */
import LayerScreen from '@module-base/screens/LayerScreen';

/** lazy components */
const SigninForm = React.lazy(() => import('@module-auth/components/AuthForm/SigninForm'));
const RegisterForm = React.lazy(() => import('@module-auth/components/AuthForm/RegisterForm'));
const RecoverForm = React.lazy(() => import('@module-auth/components/AuthForm/RecoverForm'));

export default function AuthScreen() {
    return (
        <LayerScreen>
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={AuthRouterPath.signin} element={<SigninForm />} />
                    <Route path={AuthRouterPath.register} element={<RegisterForm />} />
                    <Route path={AuthRouterPath.recover} element={<RecoverForm />} />
                    <Route path="*" element={<Navigate to={AuthRouterPath.signin} replace />} />
                </Routes>
            </React.Suspense>
        </LayerScreen>
    );
}
