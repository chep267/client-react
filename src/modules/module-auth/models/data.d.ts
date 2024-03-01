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
        isAuth: boolean;
        me: TypeUser;
    };
    method: {
        setAuth(options?: AuthContextProps['data']): void;
    };
};

export type AuthProviderProps = PropsWithChildren;
