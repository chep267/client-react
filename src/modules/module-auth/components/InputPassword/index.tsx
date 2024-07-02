/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

/** components */
import PasswordField from '@module-base/components/PasswordField';

/** types */
import type { FieldValues } from 'react-hook-form';
import type { InputPasswordProps } from '@module-auth/models';

export default function InputPassword<T extends FieldValues>(props: InputPasswordProps<T>) {
    const { name, control, error, errorMessage, setFocus, isConfirm } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <PasswordField
                        inputRef={field.ref}
                        label={<FormattedMessage id={`module.auth.input.label.${isConfirm ? 'confirm.' : ''}password`} />}
                        value={field.value}
                        name={field.name}
                        disabled={field.disabled}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        variant="outlined"
                        spellCheck={false}
                        fullWidth
                        autoComplete={isConfirm ? undefined : 'password'}
                        error={error}
                        helperText={errorMessage ? <FormattedMessage id={errorMessage} /> : undefined}
                        setFocus={() => setFocus(name)}
                    />
                );
            }}
        />
    );
}
