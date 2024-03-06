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
import { useSignin } from '@module-auth/hooks/useSignin.ts';
import { useFormAuth } from '@module-auth/hooks/useFormAuth.ts';

export default function SigninForm() {
    const SIGN_IN = useSignin();
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
            <InputEmail name="email" control={control} error={Boolean(errors.email)} errorMessage={errors.email?.message} />
            <InputPassword
                name="password"
                control={control}
                error={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                setFocus={setFocus}
            />
            <Box className="flex flex-row items-end justify-between">
                <AuthBreadcrumbs />
                <ButtonSubmit loading={SIGN_IN.isPending} type="signin" />
            </Box>
        </Paper>
    );
}
