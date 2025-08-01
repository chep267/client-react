/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

/** components */
import PasswordField from '@module-base/components/PasswordField';

/** types */
import type { FieldValues } from 'react-hook-form';

export default function FieldPassword<T extends FieldValues>(props: App.ModuleAuth.Component.FormTextFieldProps<T>) {
    const { name, control, ...fieldProps } = props;
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <PasswordField
            id={name}
            variant="outlined"
            spellCheck={false}
            fullWidth
            {...fieldProps}
            inputRef={field.ref}
            value={field.value}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={Boolean(error?.message)}
            helperText={error?.message ? <FormattedMessage id={error.message} /> : undefined}
        />
    );
}
