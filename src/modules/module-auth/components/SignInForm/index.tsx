/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useSignIn } from '@module-auth/hooks/useSignIn';
import { useFormAuth } from '@module-auth/hooks/useFormAuth';

/** components */
import InputEmail from '@module-auth/components/InputEmail';
import InputPassword from '@module-auth/components/InputPassword';
import ButtonSubmit from '@module-auth/components/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/AuthBreadcrumbs';

/** types */
import type { TypeFormAuth } from '@module-auth/types';
import type { AxiosError } from 'axios';

export default function SignInForm() {
    const hookSignIn = useSignIn();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
        setError,
    } = useFormAuth({ type: 'signIn' });

    const onSubmit = React.useCallback((data) => {
        hookSignIn.mutate(data, {
            onError: (error: AxiosError) => {
                const code = Number(error?.response?.status);
                let messageIntl: string;
                switch (true) {
                    case AppEnv.isFirebase:
                    case code >= 400 && code < 500:
                        messageIntl = AuthLanguage.notify.signIn.error;
                        break;
                    default:
                        messageIntl = AuthLanguage.notify.server.error;
                        break;
                }
                setError('email', { message: messageIntl });
                setError('password', { message: messageIntl });
                setFocus('email');
            },
        });
    }, []);

    return (
        <Paper
            className="z-10 flex w-11/12 flex-col gap-y-5 rounded-md p-6 shadow-lg shadow-gray-500/40 md:max-w-xl"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <InputEmail<TypeFormAuth>
                name="email"
                control={control}
                error={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            />
            <InputPassword<TypeFormAuth>
                name="password"
                control={control}
                error={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                setFocus={setFocus}
            />
            <Box
                className={classnames('flex', {
                    ['flex-col items-start gap-2']: true, // mobile
                    ['sm:flex-row sm:items-end sm:justify-between']: true, // desktop
                })}
            >
                <AuthBreadcrumbs />
                <ButtonSubmit loading={hookSignIn.isPending} type="signIn" />
            </Box>
        </Paper>
    );
}
