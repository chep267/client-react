/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

/** constants */
import { AppRegex } from '@module-base/constants/AppRegex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** types */
import type { FieldValues } from 'react-hook-form';
import type { FieldEmailProps } from '@module-auth/types';

export default function FieldEmail<T extends FieldValues>(props: FieldEmailProps<T>) {
    const { name, control, error, errorMessage, clearErrors } = props;

    const { field } = useController({
        name,
        control,
        rules: {
            required: AuthLanguage.status.email.empty,
            pattern: {
                value: AppRegex.email,
                message: AuthLanguage.status.email.invalid,
            },
        },
    });

    return (
        <TextField
            type="email"
            label={<FormattedMessage id={AuthLanguage.component.label.email} />}
            disabled={field.disabled}
            variant="outlined"
            spellCheck={false}
            fullWidth
            autoComplete="email"
            autoFocus
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
        />
    );
}
