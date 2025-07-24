/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import * as z from 'zod';
import Cookie from 'js-cookie';
import { HttpStatusCode } from 'axios';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppRegex } from '@module-base/constants/AppRegex';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { delay } from '@module-base/utils/delay';

/** hooks */
import { useSignin } from '@module-auth/hooks/useAuth';

/** components */
import AuthTitle from '@module-auth/components/general/AuthTitle';
import AuthBreadcrumbs from '@module-auth/components/general/AuthBreadcrumbs';
import FieldEmail from '@module-auth/components/general/FieldEmail';
import FieldPassword from '@module-auth/components/general/FieldPassword';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit';

/** types */
import type { SubmitHandler } from 'react-hook-form';
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    email: string;
    password: string;
};

export default function SigninForm() {
    const FormFieldsName = React.useRef<Readonly<{ [Key in TypeFormFieldsName]: Key }>>({
        email: 'email',
        password: 'password',
    }).current;
    const schema = React.useRef<z.ZodType<TypeFormData, TypeFormData>>(
        z.object({
            [FormFieldsName.email]: z
                .string()
                .nonempty(AuthLanguage.status.email.empty)
                .regex(AppRegex.email, AuthLanguage.status.email.invalid),
            [FormFieldsName.password]: z
                .string()
                .nonempty(AuthLanguage.status.password.empty)
                .regex(AppRegex.password, AuthLanguage.status.password.invalid),
        })
    ).current;

    const hookSignin = useSignin();
    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: Cookie.get(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
            [FormFieldsName.password]: 'Midom@2024',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmit = React.useCallback<SubmitHandler<TypeFormData>>((data) => {
        hookSignin.mutate(data, {
            onError: (error: AxiosError) => {
                const code = Number(error?.response?.status);
                let messageIntl: string;
                switch (true) {
                    case code >= HttpStatusCode.BadRequest && code < HttpStatusCode.InternalServerError:
                        messageIntl = AuthLanguage.notify.signin.error;
                        break;
                    default:
                        messageIntl = AuthLanguage.notify.server.error;
                        break;
                }
                setError(FormFieldsName.email, { message: messageIntl });
                setError(FormFieldsName.password, { message: messageIntl });
                delay(AppTimer.notifyDuration, clearErrors).then();
            },
        });
    }, []);

    const renderMessageIntl = (messageIntl?: string) => {
        return messageIntl ? <FormattedMessage id={messageIntl} /> : undefined;
    };

    return (
        <Paper
            className="z-1 flex w-full max-w-xl flex-col gap-y-5 overflow-hidden rounded-md p-6 shadow-lg"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <AuthTitle className="pb-6" name="signin" />
            <FieldEmail
                name={FormFieldsName.email}
                control={control}
                autoFocus
                error={Boolean(errors.email)}
                label={renderMessageIntl(AuthLanguage.component.label.email)}
                helperText={renderMessageIntl(errors.email?.message)}
            />
            <FieldPassword
                name={FormFieldsName.password}
                control={control}
                error={Boolean(errors.password)}
                label={renderMessageIntl(AuthLanguage.component.label.password)}
                helperText={renderMessageIntl(errors.password?.message)}
            />
            <Box className={clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')}>
                <AuthBreadcrumbs name="signin" />
                <ButtonSubmit loading={hookSignin.isPending} name="signin" />
            </Box>
        </Paper>
    );
}
