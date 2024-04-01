/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** components */
import InputEmail from '@module-auth/components/InputEmail';
import InputPassword from '@module-auth/components/InputPassword';
import ButtonSubmit from '@module-auth/components/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/AuthBreadcrumbs';

/** hooks */
import { useSignIn } from '@module-auth/hooks/useSignIn.ts';
import { useFormAuth } from '@module-auth/hooks/useFormAuth.ts';

export default function RegisterForm() {
    const SIGN_IN = useSignIn();
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
