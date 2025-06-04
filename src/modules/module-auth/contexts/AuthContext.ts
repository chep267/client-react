/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

export const defaultAuthState: Readonly<App.ModuleAuth.Hook.AuthContext['data']> = {
    isAuthentication: false,
    user: null,
    prePath: '/',
};

export const AuthContext = React.createContext<App.ModuleAuth.Hook.AuthContext>({
    data: defaultAuthState,
    method: {
        setAuth: AppDefaultValue.emptyFunction,
        setPrePath: AppDefaultValue.emptyFunction,
    },
});
