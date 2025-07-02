/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { vi as viBase } from '@module-base/utils/lang/vi';
import { vi as viAuth } from '@module-auth/utils/lang/vi';
import { vi as viGlobal } from '@module-global/utils/lang/vi';

export const vi = Object.assign({}, viBase, viAuth, viGlobal);
