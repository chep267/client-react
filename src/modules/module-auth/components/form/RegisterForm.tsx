/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRegister } from '@module-auth/hooks/useRegister';

/** components */
import FieldEmail from '@module-auth/components/general/FieldEmail';
import FieldPassword from '@module-auth/components/general/FieldPassword';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/general/AuthBreadcrumbs';

/** types */
import type { SubmitHandler } from 'react-hook-form';
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email' | 'password' | 'confirmPassword';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

export default function RegisterForm() {
    const FormFieldsName = React.useRef<Readonly<{ [Key in TypeFormFieldsName]: Key }>>({
        email: 'email',
        password: 'password',
        confirmPassword: 'confirmPassword',
    }).current;

    const hookRegister = useRegister();
    const {
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
        setFocus,
        setError,
    } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: '',
            [FormFieldsName.password]: '',
            confirmPassword: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const onSubmit = React.useCallback<SubmitHandler<TypeFormData>>((data) => {
        if (data.password !== data.confirmPassword) {
            const messageIntl = AuthLanguage.status.password.different;
            setError(FormFieldsName.confirmPassword, { message: messageIntl });
            setFocus(FormFieldsName.confirmPassword);
            return;
        }
        hookRegister.mutate(data, {
            onError: (error: AxiosError) => {
                const code = Number(error?.response?.status);
                let messageIntl: string;
                switch (true) {
                    case code >= 400 && code < 500:
                        messageIntl = AuthLanguage.notify.register.error;
                        break;
                    default:
                        messageIntl = AuthLanguage.notify.server.error;
                        break;
                }
                setError(FormFieldsName.email, { message: messageIntl });
                setError(FormFieldsName.password, { message: messageIntl });
                setError(FormFieldsName.confirmPassword, { message: messageIntl });
                setFocus(FormFieldsName.email);
            },
        });
    }, []);

    return (
        <Paper
            className="z-10 flex w-full max-w-xl flex-col gap-y-5 overflow-hidden rounded-md p-6 shadow-lg shadow-gray-500/40"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <FieldEmail
                name={FormFieldsName.email}
                control={control}
                error={Boolean(errors.email)}
                errorMessage={errors.email?.message}
                clearErrors={clearErrors}
            />
            <FieldPassword
                name={FormFieldsName.password}
                control={control}
                error={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                clearErrors={clearErrors}
                setFocus={setFocus}
            />
            <FieldPassword
                name={FormFieldsName.confirmPassword}
                control={control}
                error={Boolean(errors.confirmPassword)}
                errorMessage={errors.confirmPassword?.message}
                clearErrors={clearErrors}
                setFocus={setFocus}
                isConfirm={true}
            />
            <Box className={classnames('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')}>
                <AuthBreadcrumbs />
                <ButtonSubmit loading={hookRegister.isPending} type="register" />
            </Box>
        </Paper>
    );
}
