/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Cookie from 'js-cookie';
import { HttpStatusCode } from 'axios';
import clsx from 'clsx';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppRegex } from '@module-base/constants/AppRegex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useSignin } from '@module-auth/hooks/useAuth';

/** components */
import FieldEmail from '@module-auth/components/general/FieldEmail';
import FieldPassword from '@module-auth/components/general/FieldPassword';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/general/AuthBreadcrumbs';

/** types */
import type { SubmitHandler } from 'react-hook-form';
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email' | 'password';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

export default function SigninForm() {
    const FormFieldsName = React.useRef<Readonly<{ [Key in TypeFormFieldsName]: Key }>>({
        email: 'email',
        password: 'password',
    }).current;
    const schema = React.useRef(
        z.object({
            [FormFieldsName.email]: z
                .string()
                .nonempty(AuthLanguage.status.email.empty)
                .check(z.email(AuthLanguage.status.email.invalid)),
            [FormFieldsName.password]: z
                .string()
                .nonempty(AuthLanguage.status.password.empty)
                .regex(AppRegex.password, AuthLanguage.status.password.invalid),
        })
    );

    const hookSignin = useSignin();
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        clearErrors,
        setFocus,
        setError,
    } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: Cookie.get(AppKey.email) || 'dong.nguyenthanh@powergatesoftware.com',
            [FormFieldsName.password]: 'Midom@2024',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(schema.current),
    });
    const [email, password] = watch([FormFieldsName.email, FormFieldsName.password]);

    React.useEffect(() => {
        clearErrors([FormFieldsName.email, FormFieldsName.password]);
    }, [email, password]);

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
            <FieldEmail
                name={FormFieldsName.email}
                control={control}
                error={Boolean(errors.email)}
                label={<FormattedMessage id={AuthLanguage.component.label.email} />}
                helperText={errors.email?.message ? <FormattedMessage id={errors.email.message} /> : undefined}
            />
            <FieldPassword
                name={FormFieldsName.password}
                control={control}
                error={Boolean(errors.password)}
                label={<FormattedMessage id={AuthLanguage.component.label.password} />}
                helperText={errors.password?.message ? <FormattedMessage id={errors.password.message} /> : undefined}
            />
            <Box className={clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')}>
                <AuthBreadcrumbs />
                <ButtonSubmit loading={hookSignin.isPending} type="signin" />
            </Box>
        </Paper>
    );
}
