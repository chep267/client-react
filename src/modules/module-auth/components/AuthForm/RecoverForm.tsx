/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import * as z from 'zod';
import Cookie from 'js-cookie';
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
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** components */
import AuthTitle from '@module-auth/components/general/AuthTitle';
import AuthBreadcrumbs from '@module-auth/components/general/AuthBreadcrumbs';
import FieldEmail from '@module-auth/components/general/FieldEmail';
import ButtonRecover from '@module-auth/components/general/ButtonRecover';

/** types */
import type { AxiosError } from 'axios';

type TypeFormFieldsName = 'email';
type TypeFormData = {
    email: string;
};

export default function RecoverForm() {
    const FormFieldsName = React.useMemo<Readonly<{ [Key in TypeFormFieldsName]: Key }>>(
        () => ({
            email: 'email',
        }),
        []
    );

    const schema = React.useMemo<z.ZodType<TypeFormData, TypeFormData>>(
        () =>
            z.object({
                [FormFieldsName.email]: z
                    .string()
                    .nonempty(AuthLanguage.status.email.empty)
                    .regex(AppRegex.email, AuthLanguage.status.email.invalid),
            }),
        []
    );

    const { handleSubmit, control, setError, clearErrors } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: Cookie.get(AppKey.email) || '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmitError = (error: AxiosError) => {
        let messageIntl: string;
        switch (true) {
            case isCallApiErrorByClient(error):
                messageIntl = AuthLanguage.notify.recover.error;
                break;
            default:
                messageIntl = AuthLanguage.notify.server.error;
                break;
        }
        setError(FormFieldsName.email, { message: messageIntl });
        delay(AppTimer.notifyDuration, clearErrors).then();
    };

    return (
        <Paper
            className={clsx(
                'flex flex-col',
                'w-full max-w-xl',
                'z-1 gap-y-5 rounded-md p-6',
                'overflow-hidden shadow-lg'
            )}
            component="form"
            noValidate
        >
            <AuthTitle className="pb-6" name="recover" />

            <FieldEmail
                name={FormFieldsName.email}
                control={control}
                label={<FormattedMessage id={AuthLanguage.component.label.email} />}
                autoComplete="username"
                autoFocus
            />

            <Box className={clsx('flex flex-col items-end justify-between', 'w-full gap-2', 'xs:flex-row')}>
                <AuthBreadcrumbs name="recover" />
                <ButtonRecover handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </Box>
        </Paper>
    );
}
