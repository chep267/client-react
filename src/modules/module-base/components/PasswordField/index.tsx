/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function PasswordField(props: App.ModuleBase.Component.PasswordFieldProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = React.useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const slotProps = React.useMemo(() => {
        return {
            input: {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={toggleShowPassword}
                            onMouseDown={preventDefault}
                            onMouseUp={preventDefault}
                            aria-label="show-hide"
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            },
        };
    }, [showPassword]);

    return <TextField {...props} slotProps={slotProps} type={showPassword ? 'text' : 'password'} />;
}
