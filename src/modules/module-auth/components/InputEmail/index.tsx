/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import TextField from '@mui/material/TextField';

/** types */
import type { Control, FieldValues, FieldPath } from 'react-hook-form';

type InputEmailProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
};

export default function InputEmail<T extends FieldValues>(props: InputEmailProps<T>) {
    const { name, control, error, errorMessage } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field } }) => {
                return (
                    <TextField
                        {...field}
                        inputRef={ref}
                        type="email"
                        label={<FormattedMessage id="module.auth.input.label.email" />}
                        variant="outlined"
                        spellCheck={false}
                        fullWidth
                        autoComplete="email"
                        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                        error={error}
                        helperText={errorMessage ? <FormattedMessage id={errorMessage} /> : undefined}
                    />
                );
            }}
        />
    );
}
