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
    const FormFieldsName = React.useRef<Readonly<{ [Key in TypeFormFieldsName]: Key }>>({
        email: 'email',
    }).current;
    const schema = React.useRef(
        z.object({
            [FormFieldsName.email]: z
                .string()
                .nonempty(AuthLanguage.status.email.empty)
                .regex(AppRegex.email, AuthLanguage.status.email.invalid),
        })
    ).current;

    const { handleSubmit, control, setError, clearErrors } = useForm<TypeFormData>({
        defaultValues: {
            [FormFieldsName.email]: Cookie.get(AppKey.email) || '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const onSubmitError = React.useCallback((error: AxiosError) => {
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
        delay(AppTimer.notifyDuration, clearErrors).then();
    }, []);

    return (
        <Paper
            className="z-1 flex w-full max-w-xl flex-col gap-y-5 overflow-hidden rounded-md p-6 shadow-lg"
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

            <Box className={clsx('flex w-full items-end justify-between gap-2', 'flex-col', 'xs:flex-row')}>
                <AuthBreadcrumbs name="recover" />
                <ButtonRecover handleSubmit={handleSubmit} onSubmitError={onSubmitError} />
            </Box>
        </Paper>
    );
}
