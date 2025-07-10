/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useController } from 'react-hook-form';

/** components */
import PasswordField from '@module-base/components/PasswordField';

/** types */
import type { FieldValues } from 'react-hook-form';

export default function FieldPassword<T extends FieldValues>(props: App.ModuleAuth.Component.FormTextFieldProps<T>) {
    const { name, control, ...fieldProps } = props;
    const { field } = useController({ name, control });

    return (
        <PasswordField
            type="email"
            variant="outlined"
            autoComplete="email"
            spellCheck={false}
            fullWidth
            {...fieldProps}
            inputRef={field.ref}
            value={field.value}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
        />
    );
}
