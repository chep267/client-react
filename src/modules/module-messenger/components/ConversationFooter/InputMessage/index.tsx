/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

/** utils */
import { focusInput } from '@module-base/utils/focusInput';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** components */
import ButtonChooseEmoji from '@module-messenger/components/ConversationFooter/ButtonChooseEmoji';

export default function InputMessage() {
    const { tid = '' } = useParams();
    const { ui, method } = useMessenger();

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [text, setText] = React.useState('');
    const draft = tid ? ui.drafts[tid] : null;

    /** effect init text */
    React.useEffect(() => {
        setText(draft?.text || '');
        focusInput({ elem: inputRef.current });
    }, [tid]);

    /** effect change text */
    React.useEffect(() => {
        if (tid && text !== draft?.text) {
            method.setText({ tid, text });
        }
    }, [text]);

    const onChangeValue = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }, []);

    const InputProps = React.useMemo(() => {
        return {
            className: 'rounded-3xl pl-5 pr-3',
            endAdornment: (
                <InputAdornment position="end">
                    <ButtonChooseEmoji />
                </InputAdornment>
            ),
        };
    }, []);

    return (
        <TextField
            inputRef={inputRef}
            value={text}
            placeholder="Aa"
            size="small"
            multiline
            maxRows={3}
            variant="outlined"
            spellCheck={false}
            fullWidth
            slotProps={{
                input: InputProps,
            }}
            onChange={onChangeValue}
        />
    );
}
