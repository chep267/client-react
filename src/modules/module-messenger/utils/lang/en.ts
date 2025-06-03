/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

export const en = Object.freeze({
    [MessengerLanguage.component.label.router]: 'Messenger',
    [MessengerLanguage.component.label.thread]: 'Messenger',

    [MessengerLanguage.component.label.message.option]: 'See more',
    [MessengerLanguage.component.select.reply]: 'Reply',
    [MessengerLanguage.component.select.forward]: 'Forward',
    [MessengerLanguage.component.select.copy]: 'Copy',
    [MessengerLanguage.component.select.revoke]: 'Revoke',
    [MessengerLanguage.component.select.delete]: 'Delete',

    [MessengerLanguage.component.button.chooseFile]: 'Choose files',
    [MessengerLanguage.component.button.chooseEmoji]: 'Choose emoji',
    [MessengerLanguage.component.button.sendEmoji]: 'Emoji',
    [MessengerLanguage.component.button.sendMessage]: 'Send',

    [MessengerLanguage.component.label.message.you]: 'You',
    [MessengerLanguage.component.label.message.sent]: 'sent',
    [MessengerLanguage.component.label.message.count.image.single]: '{number} image',
    [MessengerLanguage.component.label.message.count.image.multi]: '{number} images',
    [MessengerLanguage.component.label.message.count.video.single]: '{number} video',
    [MessengerLanguage.component.label.message.count.video.multi]: '{number} videos',
});
