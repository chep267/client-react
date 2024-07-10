/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { NotifyContext, defaultNotifyState } from '@module-base/contexts/NotifyContext.ts';

/** components */
import ErrorBoundary from '@module-base/components/ErrorBoundary';

/** types */
import type { TypeNotifyContext, TypeNotify, NotifyProviderProps } from '@module-base/types';

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
