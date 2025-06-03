/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

export const vi = Object.freeze({
    [MessengerLanguage.component.label.router]: 'Trò chuyện',
    [MessengerLanguage.component.label.thread]: 'Trò chuyện',

    [MessengerLanguage.component.label.message.option]: 'Xem thêm',
    [MessengerLanguage.component.select.reply]: 'Trả lời',
    [MessengerLanguage.component.select.forward]: 'Chuyển tiếp',
    [MessengerLanguage.component.select.copy]: 'Sao chép',
    [MessengerLanguage.component.select.revoke]: 'Thu hồi',
    [MessengerLanguage.component.select.delete]: 'Xóa',

    [MessengerLanguage.component.button.chooseFile]: 'Chọn tập tin',
    [MessengerLanguage.component.button.chooseEmoji]: 'Chọn biểu tượng cảm xúc',
    [MessengerLanguage.component.button.sendEmoji]: 'Cảm xúc',
    [MessengerLanguage.component.button.sendMessage]: 'Gửi',

    [MessengerLanguage.component.label.message.you]: 'Bạn',
    [MessengerLanguage.component.label.message.sent]: 'Đã gửi',
    [MessengerLanguage.component.label.message.count.image.single]: '{number} ảnh',
    [MessengerLanguage.component.label.message.count.image.multi]: '{number} ảnh',
    [MessengerLanguage.component.label.message.count.video.single]: '{number} video',
    [MessengerLanguage.component.label.message.count.video.multi]: '{number} videos',
});
