/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/** lib components */
import { Box } from '@mui/material';

/** components */
import { AuthTitle } from '@module-auth/components';

/** constants */
import { AuthScreenPath } from '@module-auth/constants';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));
const SigninForm = React.lazy(() => import('@module-auth/components/SigninForm'));
const RegisterForm = React.lazy(() => import('@module-auth/components/RegisterForm'));
const RecoverForm = React.lazy(() => import('@module-auth/components/RecoverForm'));

export default function SigninScreen() {
    return (
        <Box className="flex flex-col justify-center items-center w-full h-full gap-y-10">
            <AuthTitle />
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path={AuthScreenPath.signin} element={<SigninForm />} />
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
