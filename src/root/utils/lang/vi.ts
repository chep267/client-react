/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { vi as viLang } from '@module-language/utils/lang/vi';
import { vi as viTheme } from '@module-theme/utils/lang/vi';
import { vi as viBase } from '@module-base/utils/lang/vi';
import { vi as viAuth } from '@module-auth/utils/lang/vi';
import { vi as viGlobal } from '@module-global/utils/lang/vi';

export const vi = Object.assign({}, viLang, viTheme, viBase, viAuth, viGlobal);
