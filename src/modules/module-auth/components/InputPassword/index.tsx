/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

/** components */
import PasswordField from '@module-base/components/PasswordField';

/** types */
import type { Control, FieldValues, FieldPath, UseFormSetFocus } from 'react-hook-form';

type InputPasswordProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
    setFocus: UseFormSetFocus<T>;
    isConfirm?: boolean;
};

export default function InputPassword<T extends FieldValues>(props: InputPasswordProps<T>) {
    const { name, control, error, errorMessage, setFocus, isConfirm } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field } }) => {
                return (
                    <PasswordField
                        {...field}
                        inputRef={ref}
                        label={<FormattedMessage id={`module.auth.input.label.${isConfirm ? 'confirm.' : ''}password`} />}
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
