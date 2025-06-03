/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** types */
import type { AuthContextProps } from '@module-auth/types';

export const defaultAuthState: Readonly<AuthContextProps['data']> = {
    isAuthentication: false,
    user: null,
    prePath: '/',
};

export const AuthContext = React.createContext<AuthContextProps>({
    data: defaultAuthState,
    method: {
        setAuth: AppDefaultValue.emptyFunction,
        setPrePath: AppDefaultValue.emptyFunction,
    },
});
