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
    [BaseLanguage.component.label.develop]: 'On develop!',
    [BaseLanguage.component.label.error.server]: 'Máy chủ không phản hồi!',
    [BaseLanguage.component.label.error.fallback.title]: 'Đã xảy ra lỗi',
    [BaseLanguage.component.label.error.fallback.content]: 'Bạn hãy thử chạy lại ứng dụng',
    [BaseLanguage.component.label.error.fallback.autoReload]: '( Tự động tải lại sau {second} giây )',
    [BaseLanguage.component.button.retry]: 'Thử lại',
    [BaseLanguage.component.table.empty]: 'Dữ liệu trống!',
} as const;
