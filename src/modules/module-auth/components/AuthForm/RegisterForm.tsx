/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { HttpStatusCode } from 'axios';
import clsx from 'clsx';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRegister } from '@module-auth/hooks/useAuth';

/** components */
import AuthTitle from '@module-auth/components/AuthTitle';
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
    const schema = React.useRef(
        z
            .object({
                [FormFieldsName.email]: z
                    .string()
                    .nonempty(AuthLanguage.status.email.empty)
                    .check(z.email(AuthLanguage.status.email.invalid)),
                [FormFieldsName.password]: z
                    .string()
                    .nonempty(AuthLanguage.status.password.empty)
                    .regex(AppRegex.password, AuthLanguage.status.password.invalid),
                [FormFieldsName.confirmPassword]: z
                    .string()
                    .nonempty(AuthLanguage.status.password.empty)
                    .regex(AppRegex.password, AuthLanguage.status.password.invalid),
            })
            .refine((data) => data[FormFieldsName.password] === data[FormFieldsName.confirmPassword], {
                path: [FormFieldsName.confirmPassword],
                message: AuthLanguage.status.password.different,
            })
    ).current;

    const hookRegister = useRegister();
    const {
        handleSubmit,
        control,
        watch,
        clearErrors,
        setFocus,
        setError,
        formState: { errors },
    } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: '',
            [FormFieldsName.password]: '',
            [FormFieldsName.confirmPassword]: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(schema),
    });
    const [email, password, confirmPassword] = watch([
        FormFieldsName.email,
        FormFieldsName.password,
        FormFieldsName.confirmPassword,
    ]);

    React.useEffect(() => {
        clearErrors([FormFieldsName.email, FormFieldsName.password, FormFieldsName.confirmPassword]);
    }, [email, password, confirmPassword]);

    const onSubmit = React.useCallback<SubmitHandler<TypeFormData>>((data) => {
        hookRegister.mutate(data, {
            onError: (error: AxiosError) => {
                const code = Number(error?.response?.status);
                let messageIntl: string;
                switch (true) {
                    case code >= HttpStatusCode.BadRequest && code < HttpStatusCode.InternalServerError:
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
            className="z-1 flex w-full max-w-xl flex-col gap-y-5 overflow-hidden rounded-md p-6 shadow-lg"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <AuthTitle className="pb-6" name="register" />
            <FieldEmail
                name={FormFieldsName.email}
                control={control}
                autoComplete="off"
                autoFocus
                error={Boolean(errors.email)}
                label={<FormattedMessage id={AuthLanguage.component.label.email} />}
                helperText={errors.email?.message ? <FormattedMessage id={errors.email.message} /> : undefined}
            />
            <FieldPassword
                name={FormFieldsName.password}
                control={control}
                autoComplete="off"
                error={Boolean(errors.password)}
                label={<FormattedMessage id={AuthLanguage.component.label.password} />}
                helperText={errors.password?.message ? <FormattedMessage id={errors.password.message} /> : undefined}
            />
            <FieldPassword
                name={FormFieldsName.confirmPassword}
                control={control}
                autoComplete="off"
                error={Boolean(errors.confirmPassword)}
                label={<FormattedMessage id={AuthLanguage.component.label.confirmPassword} />}
                helperText={
                    errors.confirmPassword?.message ? <FormattedMessage id={errors.confirmPassword.message} /> : undefined
                }
            />
            <Box className={clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')}>
                <AuthBreadcrumbs name="register" />
                <ButtonSubmit loading={hookRegister.isPending} name="register" />
            </Box>
        </Paper>
    );
}
