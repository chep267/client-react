/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/** types */
import type { PasswordFieldProps } from '@module-base/types';

export default function PasswordField(props: PasswordFieldProps) {
    const { setFocus, ...inputProps } = props;
    const [showPassword, setShowPassword] = React.useState(-1);

    React.useEffect(() => {
        if (showPassword > -1) {
            setFocus?.();
        }
    }, [showPassword]);

    const toggleShowPassword = React.useCallback(() => {
        setShowPassword((prev) => (prev === 1 ? 0 : 1));
    }, []);

    const endAdornment = React.useMemo(() => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} aria-label="show-hide">
                    {showPassword === 1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            </InputAdornment>
        );
    }, [showPassword]);

    return (
        <TextField
            {...inputProps}
            slotProps={{
                input: {
                    endAdornment,
                },
            }}
            type={showPassword === 1 ? 'text' : 'password'}
        />
    );
}
