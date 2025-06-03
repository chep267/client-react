/**
 *
 * @author dongntd267@gmail.com
 *
 */

import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** types */
import type { ThreadSearchContextProps } from '@module-messenger/types';

export const ThreadSearchContext = React.createContext<ThreadSearchContextProps>({
    data: {
        isSearching: false,
        isFocusSearch: false,
        searchKey: '',
    },
    method: {
        setSearching: AppDefaultValue.emptyFunction,
        setFocusSearch: AppDefaultValue.emptyFunction,
        setSearchKey: AppDefaultValue.emptyFunction,
    },
});
