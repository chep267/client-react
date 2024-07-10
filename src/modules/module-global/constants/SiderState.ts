/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import { TypeSiderState } from '@module-global/models';

export const SiderState = Object.freeze<Record<TypeSiderState, TypeSiderState>>({
    collapse: 'collapse',
    expand: 'expand',
    hidden: 'hidden',
    force: 'force',
});
