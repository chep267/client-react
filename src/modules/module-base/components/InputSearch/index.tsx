/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** types */
import type { InputSearchProps } from '@module-base/types';

export default function InputSearch(props: InputSearchProps) {
    const {
        type = 'text',
        size = 'small',
        spellCheck = false,
        timer = AppTimer.searching,
        onChangeValue,
        onLoading,
        slotProps,
        ...inputProps
    } = props;

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const prevValue = React.useRef('');
    const [value, setValue] = React.useState('');

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

    const onChange = React.useCallback<NonNullable<InputSearchProps['onChange']>>(
        (event) => setValue(event?.target?.value || ''),
        []
    );

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
                className={clsx('cursor-pointer', { ['visible']: value }, { ['invisible']: !value })}
                onClick={onClear}
            >
                <ClearIcon color="primary" />
            </InputAdornment>
        );
    }, [Boolean(value)]);

    return (
        <TextField
            inputRef={inputRef}
            type={type}
            size={size}
            spellCheck={spellCheck}
            value={value}
            slotProps={{
                ...slotProps,
                input: {
                    startAdornment,
                    endAdornment,
                    ...slotProps?.input,
                },
            }}
            onChange={onChange}
            {...inputProps}
        />
    );
}
