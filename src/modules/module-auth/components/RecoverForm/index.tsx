/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRecover } from '@module-auth/hooks/useRecover';
import { useFormAuth } from '@module-auth/hooks/useFormAuth';

/** components */
import InputEmail from '@module-auth/components/InputEmail';
import ButtonSubmit from '@module-auth/components/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/AuthBreadcrumbs';

/** types */
import type { TypeFormAuth } from '@module-auth/types';

export default function RecoverForm() {
    const RECOVER = useRecover();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
        setError,
    } = useFormAuth({ type: 'recover' });

    const onSubmit = handleSubmit((data) => {
        RECOVER.mutate(data, {
            onError: () => {
                const messageIntl = AuthLanguage.notify.recover.error;
                setError('email', { message: messageIntl });
                setFocus('email');
            },
        });
    });

    return (
        <Paper
            className="flex flex-col w-11/12 md:max-w-xl gap-y-5 p-6 shadow-lg shadow-gray-500/40 rounded-md z-10"
            component="form"
            onSubmit={onSubmit}
            noValidate>
            <InputEmail<TypeFormAuth>
                name="email"
                control={control}
                error={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            />
            <Box
                className={classnames('flex flex-row items-end justify-between', {
                    ['max-sm:flex-col max-sm:items-start max-sm:gap-2']: true, // mobile
                })}>
                <AuthBreadcrumbs />
                <ButtonSubmit loading={RECOVER.isPending} type="recover" />
            </Box>
        </Paper>
    );
}
