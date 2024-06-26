/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { AuthContext, defaultAuthState } from '@module-auth/contexts/AuthContext.ts';

/** types */
import type { AuthContextProps, AuthProviderProps } from '@module-auth/models';

export default function AuthProvider(props: AuthProviderProps) {
    const { children } = props;
    const [auth, setAuth] = React.useState<AuthContextProps['data']>(defaultAuthState);

    const onChangeAuth = React.useCallback<AuthContextProps['method']['setAuth']>((data = defaultAuthState) => {
        setAuth({ ...defaultAuthState, ...data });
    }, []);

    const store = React.useMemo<AuthContextProps>(() => {
        return {
            data: auth,
            method: {
                setAuth: onChangeAuth,
            },
        };
    }, [auth]);

    return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
