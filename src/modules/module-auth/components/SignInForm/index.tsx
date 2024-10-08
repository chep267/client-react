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
import type { AxiosError } from '@module-base/types';

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
                let messageIntl;
                switch (true) {
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
            className="flex flex-col w-11/12 md:max-w-xl gap-y-5 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate>
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
                className={classnames('flex flex-row items-end justify-between', {
                    ['max-sm:flex-col max-sm:items-start max-sm:gap-2']: true, // mobile
                })}>
                <AuthBreadcrumbs />
                <ButtonSubmit loading={hookSignIn.isPending} type="signIn" />
            </Box>
        </Paper>
    );
}
