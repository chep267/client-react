/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** types */
import type { InputSearchProps, InputChangeEvent } from '@module-base/types';

const InputSearch = React.memo(function InputSearch(props: InputSearchProps) {
    const {
        timer = AppTimer.searching,
        onChangeValue,
        onLoading,
        type = 'text',
        spellCheck = false,
        size,
        ...inputProps
    } = props;

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const prevValue = React.useRef('');
    const [value, setValue] = React.useState('');

    const onChange = React.useCallback((event: InputChangeEvent) => setValue(event?.target?.value || ''), []);

    React.useEffect(() => {
        let timeout: NodeJS.Timeout;
        const nextValue = value.trim();

        if (nextValue !== prevValue.current) {
            if (timer > 0) {
                /** xử lý loading khi bắt đầu nhập text */
                onLoading?.(true);
                timeout = setTimeout(() => {
                    onChangeValue?.(nextValue);
                    onLoading?.(false);
                }, timer);
            } else {
                /** thay đổi text ngay lập tức */
                onChangeValue?.(nextValue);
            }
            prevValue.current = nextValue;
        }

        return () => clearTimeout(timeout);
    }, [value]);

    const onClear = React.useCallback(() => {
        setValue('');
        inputRef.current?.focus?.();
    }, []);

    const startAdornment = React.useMemo(() => {
        return (
            <InputAdornment position="start">
                <SearchIcon color="primary" />
            </InputAdornment>
        );
    }, []);

    const endAdornment = React.useMemo(() => {
        return (
            <InputAdornment
                position="end"
                style={{ visibility: value ? 'visible' : 'hidden', cursor: 'pointer' }}
                onClick={onClear}
            >
                <ClearIcon color="primary" />
            </InputAdornment>
        );
    }, [value]);

    return (
        <TextField
            inputRef={inputRef}
            type={type}
            spellCheck={spellCheck}
            value={value}
            onChange={onChange}
            size={size || 'small'}
            slotProps={{
                htmlInput: {
                    startAdornment,
                    endAdornment,
                },
            }}
            {...inputProps}
        />
    );
});

export default InputSearch;
