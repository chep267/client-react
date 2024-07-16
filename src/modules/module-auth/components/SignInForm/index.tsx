/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** hooks */
import { useSignIn } from '@module-auth/hooks/useSignIn.ts';
import { useFormAuth } from '@module-auth/hooks/useFormAuth.ts';

/** components */
import InputEmail from '@module-auth/components/InputEmail';
import InputPassword from '@module-auth/components/InputPassword';
import ButtonSubmit from '@module-auth/components/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/AuthBreadcrumbs';

/** types */
import type { TypeFormAuth } from '@module-auth/types';

export default function SignInForm() {
    const SIGN_IN = useSignIn();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
    } = useFormAuth({ type: 'signin' });

    return (
        <Paper
            className="flex flex-col w-10/12 md:max-w-xl gap-y-5 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
            component="form"
            onSubmit={handleSubmit(({ email, password }) => SIGN_IN.mutate({ email, password }))}
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
                    'max-sm:flex-col max-sm:items-start max-sm:gap-2': true, // mobile
                })}>
                <AuthBreadcrumbs />
                <ButtonSubmit loading={SIGN_IN.isPending} type="signin" />
            </Box>
        </Paper>
    );
}
