/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypeSiderState } from '@module-base/types';

export const AppSiderState: Readonly<{ [Key in TypeSiderState]: Key }> = {
    collapse: 'collapse',
    expand: 'expand',
    hidden: 'hidden',
    force: 'force',
};
