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
        setPath(path: string): void;
        setAuth(options?: AuthContextProps['data']): void;
    };
};

export type AuthProviderProps = PropsWithChildren;
