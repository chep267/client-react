/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

export const vi = {
    [BaseLanguage.component.label.default]: '',
    [BaseLanguage.component.label.start]: 'start',
    [BaseLanguage.component.label.develop]: 'Đang phát triển!',
    [BaseLanguage.component.label.error.server]: 'Máy chủ không phản hồi!',
    [BaseLanguage.component.label.error.fallback.title]: 'Đã xảy ra lỗi',
    [BaseLanguage.component.label.error.fallback.content]: 'Bạn hãy thử chạy lại ứng dụng',
    [BaseLanguage.component.label.error.fallback.autoReload]: '( Tự động tải lại sau {second} giây )',
    [BaseLanguage.component.button.retry]: 'Thử lại',
    [BaseLanguage.component.table.empty]: 'Dữ liệu trống!',

    [BaseLanguage.component.label.theme.router]: 'Giao diện',
    [BaseLanguage.component.label.theme.dark]: 'Tối',
    [BaseLanguage.component.label.theme.light]: 'Sáng',
    [BaseLanguage.component.label.language.router]: 'Ngôn ngữ',
    [BaseLanguage.component.label.language.vi]: 'Tiếng Việt',
    [BaseLanguage.component.label.language.en]: 'Tiếng Anh',
} as const;
