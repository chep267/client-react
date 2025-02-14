/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Cookie from 'js-cookie';
import { useForm } from 'react-hook-form';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppEnv } from '@module-base/constants/AppEnv';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRecover } from '@module-auth/hooks/useRecover';

/** components */
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

    const hookRecover = useRecover();
    const {
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
        setFocus,
        setError,
    } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: Cookie.get(AppKey.email) || '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const onSubmit = React.useCallback<SubmitHandler<TypeFormData>>((data) => {
        hookRecover.mutate(data, {
            onError: (error: AxiosError) => {
                const code = Number(error?.response?.status);
                let messageIntl: string;
                switch (true) {
                    case AppEnv.isFirebase:
                    case code >= 400 && code < 500:
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
            className="z-10 flex w-full max-w-xl flex-col !gap-y-5 rounded-md !p-6 shadow-lg shadow-gray-500/40"
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
            <Box className="mt-2 flex w-full items-end justify-between">
                <AuthBreadcrumbs />
                <ButtonSubmit loading={hookRecover.isPending} type="recover" />
            </Box>
        </Paper>
    );
}
