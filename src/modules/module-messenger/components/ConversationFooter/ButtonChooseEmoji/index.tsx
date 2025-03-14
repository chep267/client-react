/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { IconButton, Popover, Tooltip } from '@mui/material';
import { EmojiEmotions as EmojiEmotionsIcon } from '@mui/icons-material';

/** utils */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** components */
import EmojiPicker from '@module-messenger/components/EmojiPicker';

/** styles */
import useStyles from './styles';

/** types */
import type { ElementClickEvent } from '@module-base/types';

export default function ButtonChooseEmoji() {
    const { tid = '' } = useParams();
    const classes = useStyles();
    const { method } = useMessenger();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const openMenu = React.useCallback((event: ElementClickEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);

    const closeMenu = React.useCallback(() => setAnchorEl(null), []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onEmojiSelect = React.useCallback(
        (emoji: any) => {
            if (!tid || !emoji?.native) {
                return;
            }
            method.setText({ tid, text: emoji.native, type: 'emoji' });
        },
        [tid]
    );

    return (
        <>
            <Tooltip title={<FormattedMessage id={MessengerLanguage.component.button.chooseEmoji} />}>
                <IconButton aria-describedby={id} onClick={openMenu}>
                    <EmojiEmotionsIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
                className={classes.menuPaper}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <EmojiPicker onEmojiSelect={onEmojiSelect} />
            </Popover>
        </>
    );
}
