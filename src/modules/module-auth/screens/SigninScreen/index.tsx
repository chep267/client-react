/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** components */
import AuthTitle from '@module-auth/components/AuthTitle';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));
const SigninForm = React.lazy(() => import('@module-auth/components/form/SigninForm'));
const RegisterForm = React.lazy(() => import('@module-auth/components/form/RegisterForm'));
const RecoverForm = React.lazy(() => import('@module-auth/components/form/RecoverForm'));

export default function SigninScreen() {
    return (
        <Box className="flex h-full w-full flex-col items-center justify-center gap-y-10 p-2">
            <AuthTitle />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={AuthRouterPath.signin} element={<SigninForm />} />
                    <Route path={AuthRouterPath.register} element={<RegisterForm />} />
                    <Route path={AuthRouterPath.recover} element={<RecoverForm />} />
                    <Route path="*" element={<Navigate to={AuthRouterPath.signin} replace />} />
                </Routes>
            </React.Suspense>
            <React.Suspense fallback={null}>
                <Particle />
            </React.Suspense>
        </Box>
    );
}
