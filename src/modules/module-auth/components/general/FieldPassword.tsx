/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import { useController } from 'react-hook-form';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import PasswordField from '@module-base/components/PasswordField';

/** types */
import type { FieldValues } from 'react-hook-form';
import type { FieldPasswordProps } from '@module-auth/types';

export default function FieldPassword<T extends FieldValues>(props: FieldPasswordProps<T>) {
    const { name, control, error, errorMessage, clearErrors, setFocus, isConfirm } = props;

    const { field } = useController({
        name,
        control,
        rules: {
            required: AuthLanguage.status.password.empty,
            pattern: {
                value: AppRegex.password,
                message: AuthLanguage.status.password.invalid,
            },
        },
    });

    return (
        <PasswordField
            variant="outlined"
            label={<FormattedMessage id={AuthLanguage.component.label[isConfirm ? 'confirmPassword' : 'password']} />}
            spellCheck={false}
            fullWidth
            autoComplete={isConfirm ? undefined : 'password'}
            error={error}
            helperText={errorMessage ? <FormattedMessage id={errorMessage} /> : undefined}
            inputRef={field.ref}
            value={field.value}
            name={field.name}
            onChange={(event) => {
                field.onChange(event);
                clearErrors(name);
            }}
            onBlur={field.onBlur}
            setFocus={() => setFocus(name)}
        />
    );
}
