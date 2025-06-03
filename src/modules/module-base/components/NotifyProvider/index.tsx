/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { NotifyContext, defaultNotifyState } from '@module-base/contexts/NotifyContext';

/** components */
import ErrorBoundary from '@module-base/components/ErrorBoundary';

export default function NotifyProvider(props: App.ModuleBase.Component.NotifyProviderProps) {
    const { children } = props;

    const [notify, setNotify] = React.useState<App.ModuleBase.Hook.Notify>(defaultNotifyState);

    const toggleNotify = React.useCallback<App.ModuleBase.Hook.NotifyContext['method']['toggleNotify']>(
        (options = defaultNotifyState) => setNotify(options),
        []
    );

    const closeNotify = React.useCallback<App.ModuleBase.Hook.NotifyContext['method']['closeNotify']>(
        () => setNotify((prev) => ({ ...prev, open: false })),
        []
    );

    const store = React.useMemo<App.ModuleBase.Hook.NotifyContext>(
        () => ({
            data: notify,
            method: {
                toggleNotify,
                closeNotify,
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
