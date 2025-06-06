/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

export const en = {
    [BaseLanguage.component.label.default]: '',
    [BaseLanguage.component.label.start]: 'start',
    [BaseLanguage.component.label.develop]: 'On develop!',
    [BaseLanguage.component.label.error.server]: 'Server busy!',
    [BaseLanguage.component.label.error.fallback.title]: 'An error occurred',
    [BaseLanguage.component.label.error.fallback.content]: 'Please try to run the application again',
    [BaseLanguage.component.label.error.fallback.autoReload]: '( Auto reload after {second} seconds )',
    [BaseLanguage.component.button.retry]: 'Retry',
    [BaseLanguage.component.table.empty]: 'No data!',
} as const;
