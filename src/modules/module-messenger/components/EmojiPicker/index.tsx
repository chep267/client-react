/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useTheme } from '@mui/material';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';

type EmojiPickerProps = {
    onEmojiSelect?(emoji: any, event?: any): void;
};

export default function EmojiPicker(props: EmojiPickerProps) {
    const { onEmojiSelect } = props;
    const {
        data: { locale },
    } = useLanguage();
    const { palette } = useTheme();

    return <Picker data={data} locale={locale} theme={palette.mode} onEmojiSelect={onEmojiSelect} />;
}
