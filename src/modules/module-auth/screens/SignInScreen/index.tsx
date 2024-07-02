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
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

/** components */
import AuthTitle from '@module-auth/components/AuthTitle';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));
const SignInForm = React.lazy(() => import('@module-auth/components/SignInForm'));
const RegisterForm = React.lazy(() => import('@module-auth/components/RegisterForm'));
const RecoverForm = React.lazy(() => import('@module-auth/components/RecoverForm'));

export default function SignInScreen() {
    return (
        <Box className="flex flex-col justify-center items-center w-full h-full gap-y-10">
            <AuthTitle />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={AuthScreenPath.signin} element={<SignInForm />} />
                    <Route path={AuthScreenPath.register} element={<RegisterForm />} />
                    <Route path={AuthScreenPath.recover} element={<RecoverForm />} />
                    <Route path="*" element={<Navigate to={AuthScreenPath.signin} replace />} />
                </Routes>
            </React.Suspense>
            <React.Suspense fallback={null}>
                <Particle />
            </React.Suspense>
        </Box>
    );
}
