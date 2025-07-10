/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';

/** types */
import type { FieldValues } from 'react-hook-form';

export default function FieldEmail<T extends FieldValues>(props: App.ModuleAuth.Component.FormTextFieldProps<T>) {
    const { name, control, ...fieldProps } = props;
    const { field } = useController({ name, control });

    return (
        <TextField
            type="email"
            variant="outlined"
            autoComplete="email"
            spellCheck={false}
            fullWidth
            {...fieldProps}
            inputRef={field.ref}
            value={field.value}
            name={field.name}
            disabled={field.disabled}
            onChange={field.onChange}
            onBlur={field.onBlur}
        />
    );
}
