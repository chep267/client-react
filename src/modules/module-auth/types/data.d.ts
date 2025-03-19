/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { PropsWithChildren } from 'react';
import type { TypeUser } from '@module-user/types';

export declare type AuthContextProps = {
    data: {
        isAuthentication: boolean;
        user: TypeUser | null;
        prePath: string;
    };
    method: {
        setAuth(options?: Partial<AuthContextProps['data']>): void;
        setPrePath(path: string): void;
    };
};

export declare type AuthProviderProps = PropsWithChildren;
