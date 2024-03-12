/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** components */
import ErrorBoundary from '@module-base/components/ErrorBoundary';

/** constants */
import { defaultNotifyState } from '@module-base/constants/defaultNotifyState.ts';
import { NotifyContext } from '@module-base/constants/NotifyContext.ts';

/** types */
import type { TypeNotifyContext, TypeNotify, NotifyProviderProps } from '@module-base/models';

export default function NotifyProvider(props: NotifyProviderProps) {
    const { children } = props;

    const [notify, setNotify] = React.useState<TypeNotify>(defaultNotifyState);

    const toggleNotify = React.useCallback((options: TypeNotify = defaultNotifyState) => setNotify(options), []);

    const store = React.useMemo<TypeNotifyContext>(
        () => ({
            data: notify,
            method: {
                toggleNotify,
            },
        }),
        [notify]
    );

    return (
        <NotifyContext.Provider value={store}>
            <ErrorBoundary isAutoReload>{children}</ErrorBoundary>
        </NotifyContext.Provider>
    );
}
