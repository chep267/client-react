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
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRecover } from '@module-auth/hooks/useAuth';

/** components */
import AuthTitle from '@module-auth/components/AuthTitle';
import FieldEmail from '@module-auth/components/general/FieldEmail';
import ButtonSubmit from '@module-auth/components/general/ButtonSubmit';
import AuthBreadcrumbs from '@module-auth/components/general/AuthBreadcrumbs';

/** types */
import type { SubmitHandler } from 'react-hook-form';
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email';
type TypeFormData = {
    [Key in TypeFormFieldsName]: string;
};

export default function RecoverForm() {
    const FormFieldsName = React.useRef<Readonly<{ [Key in TypeFormFieldsName]: Key }>>({
        email: 'email',
    }).current;
    const schema = React.useRef(
        z.object({
            [FormFieldsName.email]: z
                .string()
                .nonempty(AuthLanguage.status.email.empty)
                .check(z.email(AuthLanguage.status.email.invalid)),
        })
    ).current;

    const hookRecover = useRecover();
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
            [FormFieldsName.email]: Cookie.get(AppKey.email) || '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(schema),
    });
    const email = watch(FormFieldsName.email);

    React.useEffect(() => {
        clearErrors(FormFieldsName.email);
    }, [email]);

    const onSubmit = React.useCallback<SubmitHandler<TypeFormData>>((data) => {
        hookRecover.mutate(data, {
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
            <AuthTitle className="pb-6" name="recover" />
            <FieldEmail
                name={FormFieldsName.email}
                control={control}
                error={Boolean(errors.email)}
                label={<FormattedMessage id={AuthLanguage.component.label.email} />}
                helperText={errors.email?.message ? <FormattedMessage id={errors.email.message} /> : undefined}
            />
            <Box className={clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')}>
                <AuthBreadcrumbs name="recover" />
                <ButtonSubmit loading={hookRecover.isPending} name="recover" />
            </Box>
        </Paper>
    );
}
