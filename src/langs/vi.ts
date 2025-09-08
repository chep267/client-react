/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { vi as viBase } from '@module-base/utils/langs/vi';
import { vi as viAuth } from '@module-auth/utils/langs/vi';
import { vi as viGlobal } from '@module-global/utils/langs/vi';

export const vi = Object.assign({}, viBase, viAuth, viGlobal);
