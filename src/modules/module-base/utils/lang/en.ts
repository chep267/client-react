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
    [BaseLanguage.component.label.error.fallback.autoReload]:
        '( Auto reload after {second, plural, =0 {# second} one {# second} other {# seconds}} )',
    [BaseLanguage.component.button.retry]: 'Retry',
    [BaseLanguage.component.table.empty]: 'No data!',

    [BaseLanguage.component.label.theme.router]: 'Theme',
    [BaseLanguage.component.label.theme.dark]: 'Dark',
    [BaseLanguage.component.label.theme.light]: 'Light',
    [BaseLanguage.component.label.language.router]: 'Language',
    [BaseLanguage.component.label.language.vi]: 'Vietnamese',
    [BaseLanguage.component.label.language.en]: 'English',
} as const;
