/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** types */
import type { MessengerContextProps } from '@module-messenger/types';

export const MessengerContext = React.createContext<MessengerContextProps>({
    data: {
        openThreadInfo: true,
        drafts: AppDefaultValue.emptyObject,
    },
    method: {
        setOpenThreadInfo: AppDefaultValue.emptyFunction,
        setText: AppDefaultValue.emptyFunction,
        setFiles: AppDefaultValue.emptyFunction,
        removeFiles: AppDefaultValue.emptyFunction,
        setEmptyThread: AppDefaultValue.emptyFunction,
    },
});
