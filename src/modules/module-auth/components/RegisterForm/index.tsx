/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import { Box, Paper } from '@mui/material';

/** components */
import { InputEmail, InputPassword, ButtonSubmit, AuthBreadcrumbs } from '@module-auth/components';

/** hooks */
import { useSignin } from '@module-auth/hooks';
import { useFormAuth } from '@module-auth/hooks/useFormAuth.ts';

export default function RegisterForm() {
    const SIGN_IN = useSignin();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
    } = useFormAuth({ type: 'register' });

    return (
        <Paper
            className="flex flex-col w-10/12 md:max-w-xl gap-y-5 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
            component="form"
            onSubmit={handleSubmit(({ email, password }) => SIGN_IN.mutate({ email, password }))}
            noValidate>
            <InputEmail name="email" control={control} error={Boolean(errors.email)} errorMessage={errors.email?.message} />
            <InputPassword
                name="password"
                control={control}
                error={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                setFocus={setFocus}
            />
            <InputPassword
                name="confirm_password"
                control={control}
                error={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                setFocus={setFocus}
                isConfirm={true}
            />
            <Box className="flex flex-row items-end justify-between">
                <AuthBreadcrumbs />
                <ButtonSubmit loading={SIGN_IN.isPending} type="register" />
            </Box>
        </Paper>
    );
}
