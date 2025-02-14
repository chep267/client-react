/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

/** constants */
import { Regex } from '@module-base/constants/Regex';
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
                value: Regex.email,
                message: AuthLanguage.status.email.invalid,
            },
        },
    });

    return (
        <TextField
            sx={{
                '& .MuiFormHelperText-root': {
                    textAlign: 'right',
                },
            }}
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
