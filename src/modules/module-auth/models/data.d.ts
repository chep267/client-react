/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { PropsWithChildren } from 'react';
import type { TypeUser } from '@module-user/models';

export type AuthContextProps = {
    data: {
        isAuthentication: boolean;
        prePath: '/';
        user: TypeUser;
    };
    method: {
        setAuth(options?: Partial<AuthContextProps['data']>): void;
    };
};

export type AuthProviderProps = PropsWithChildren;
