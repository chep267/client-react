/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import * as z from 'zod';
import { HttpStatusCode } from 'axios';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { delay } from '@module-base/utils/delay';

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
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterForm() {
    const FormFieldsName = React.useRef<Readonly<{ [Key in TypeFormFieldsName]: Key }>>({
        email: 'email',
        password: 'password',
        confirmPassword: 'confirmPassword',
    }).current;
    const schema = React.useRef<z.ZodType<TypeFormData, TypeFormData>>(
        z
            .object({
                [FormFieldsName.email]: z
                    .string()
                    .nonempty(AuthLanguage.status.email.empty)
                    .regex(AppRegex.email, AuthLanguage.status.email.invalid),
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
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: '',
            [FormFieldsName.password]: '',
            [FormFieldsName.confirmPassword]: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

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
                delay(AppTimer.notifyDuration, clearErrors).then();
            },
        });
    }, []);

    const renderHelperText = (messageIntl?: string) => {
        return messageIntl ? <FormattedMessage id={messageIntl} /> : undefined;
    };

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
                helperText={renderHelperText(errors.email?.message)}
            />
            <FieldPassword
                name={FormFieldsName.password}
                control={control}
                autoComplete="off"
                error={Boolean(errors.password)}
                label={<FormattedMessage id={AuthLanguage.component.label.password} />}
                helperText={renderHelperText(errors.password?.message)}
            />
            <FieldPassword
                name={FormFieldsName.confirmPassword}
                control={control}
                autoComplete="off"
                error={Boolean(errors.confirmPassword)}
                label={<FormattedMessage id={AuthLanguage.component.label.confirmPassword} />}
                helperText={renderHelperText(errors.confirmPassword?.message)}
            />
            <Box className={clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')}>
                <AuthBreadcrumbs name="register" />
                <ButtonSubmit loading={hookRegister.isPending} name="register" />
            </Box>
        </Paper>
    );
}
