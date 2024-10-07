/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import makeStyles from '@mui/styles/makeStyles';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import PasswordField from '@module-base/components/PasswordField';

/** types */
import type { FieldValues } from 'react-hook-form';
import type { InputPasswordProps } from '@module-auth/types';

const useStyles = makeStyles({
    input: {
        '& .MuiFormHelperText-root': {
            textAlign: 'right',
        },
    },
});

export default function InputPassword<T extends FieldValues>(props: InputPasswordProps<T>) {
    const { name, control, error, errorMessage, setFocus, isConfirm } = props;
    const classes = useStyles();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <PasswordField
                        inputRef={field.ref}
                        className={classes.input}
                        label={
                            <FormattedMessage id={AuthLanguage.component.label[isConfirm ? 'confirmPassword' : 'password']} />
                        }
                        value={field.value}
                        name={field.name}
                        disabled={field.disabled}
                        variant="outlined"
                        spellCheck={false}
                        fullWidth
                        autoComplete={isConfirm ? undefined : 'password'}
                        error={error}
                        helperText={errorMessage ? <FormattedMessage id={errorMessage} /> : undefined}
                        setFocus={() => setFocus(name)}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                    />
                );
            }}
        />
    );
}
