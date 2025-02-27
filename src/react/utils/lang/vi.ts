/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** utils */
import { vi as viLang } from '@module-language/utils/lang/vi';
import { vi as viTheme } from '@module-theme/utils/lang/vi';
import { vi as viBase } from '@module-base/utils/lang/vi';
import { vi as viAuth } from '@module-auth/utils/lang/vi';
import { vi as viCalendar } from '@module-calendar/utils/lang/vi';
import { vi as viGame } from '@module-game/utils/lang/vi';
// import { vi as viMessenger } from '@module-messenger/utils/lang/vi';
import { vi as viGlobal } from '@module-global/utils/lang/vi';

export const vi = Object.assign({}, viLang, viTheme, viBase, viAuth, viCalendar, viGame, viGlobal);
