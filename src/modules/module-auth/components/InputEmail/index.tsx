/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import TextField from '@mui/material/TextField';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

/** types */
import type { FieldValues } from 'react-hook-form';
import type { InputEmailProps } from '@module-auth/types';

export default function InputEmail<T extends FieldValues>(props: InputEmailProps<T>) {
    const { name, control, error, errorMessage } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <TextField
                        inputRef={field.ref}
                        type="email"
                        label={<FormattedMessage id={AuthLanguage.component.label.email} />}
                        value={field.value}
                        name={field.name}
                        disabled={field.disabled}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        variant="outlined"
                        spellCheck={false}
                        fullWidth
                        autoComplete="email"
                        autoFocus
                        error={error}
                        helperText={errorMessage ? <FormattedMessage id={errorMessage} /> : undefined}
                    />
                );
            }}
        />
    );
}
