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
import { useRegister } from '@module-auth/hooks/useRegister';
import { useFormAuth } from '@module-auth/hooks/useFormAuth';

/** components */
import InputEmail from '@module-auth/components/InputEmail';
import InputPassword from '@module-auth/components/InputPassword';
import ButtonSubmit from '@module-auth/components/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/AuthBreadcrumbs';

/** types */
import type { TypeFormAuth } from '@module-auth/types';
import type { AxiosError } from '@module-base/types';

export default function RegisterForm() {
    const hookRegister = useRegister();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
        setError,
    } = useFormAuth({ type: 'register' });

    const onSubmit = React.useCallback((data) => {
        if (data.password !== data.confirm_password) {
            const messageIntl = AuthLanguage.status.password.different;
            setError('password', { message: messageIntl });
            setFocus('confirm_password');
            return;
        }
        hookRegister.mutate(data, {
            onError: (error: AxiosError) => {
                const code = Number(error?.response?.status);
                let messageIntl;
                switch (true) {
                    case code >= 400 && code < 500:
                        messageIntl = AuthLanguage.notify.register.error;
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
            <InputPassword<TypeFormAuth>
                name="confirm_password"
                control={control}
                error={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                setFocus={setFocus}
                isConfirm={true}
            />
            <Box
                className={classnames('flex', {
                    ['flex-col items-start gap-2']: true, // mobile
                    ['sm:flex-row sm:items-end sm:justify-between']: true, // desktop
                })}
            >
                <AuthBreadcrumbs />
                <ButtonSubmit loading={hookRegister.isPending} type="register" />
            </Box>
        </Paper>
    );
}
