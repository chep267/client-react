/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { AuthContext, defaultAuthState } from '@module-auth/contexts/AuthContext';

export default function AuthProvider(props: App.ModuleAuth.Component.AuthProviderProps) {
    const { children } = props;

    const [auth, setAuth] = React.useState<App.ModuleAuth.Hook.AuthContext['data']>(defaultAuthState);
    const [prePath, setPrePath] = React.useState<App.ModuleAuth.Hook.AuthContext['data']['prePath']>(
        defaultAuthState.prePath
    );

    const onChangeAuth = React.useCallback<App.ModuleAuth.Hook.AuthContext['method']['setAuth']>(
        (data = defaultAuthState) => {
            setAuth({ ...defaultAuthState, ...data });
        },
        []
    );

    const store = React.useMemo<App.ModuleAuth.Hook.AuthContext>(() => {
        return {
            data: {
                isAuthentication: auth.isAuthentication,
                user: auth.user,
                prePath,
            },
            method: {
                setAuth: onChangeAuth,
                setPrePath,
            },
        };
    }, [auth, prePath]);

    return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
