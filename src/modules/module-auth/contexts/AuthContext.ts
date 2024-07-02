/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';

/** types */
import type { User } from 'firebase/auth';
import type { AuthContextProps } from '@module-auth/models';

export const defaultAuthState = Object.freeze<AuthContextProps['data']>({
    isAuthentication: false,
    user: {} as User,
    prePath: '/',
});

export const AuthContext = React.createContext<AuthContextProps>({
    data: defaultAuthState,
    method: {
        setAuth: AppDefaultValue.emptyFunction,
    },
});
