/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { AuthContext, defaultAuthState } from '@module-auth/contexts/AuthContext';

/** types */
import type { AuthContextProps, AuthProviderProps } from '@module-auth/types';

export default function AuthProvider(props: AuthProviderProps) {
    const { children } = props;

    const [auth, setAuth] = React.useState<AuthContextProps['data']>(defaultAuthState);
    const [prePath, setPrePath] = React.useState<AuthContextProps['data']['prePath']>(defaultAuthState.prePath);

    const onChangeAuth = React.useCallback<AuthContextProps['method']['setAuth']>((data = defaultAuthState) => {
        setAuth({ ...defaultAuthState, ...data });
    }, []);

    const store = React.useMemo<AuthContextProps>(() => {
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
