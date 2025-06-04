/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types';

export type TypeAuthContext = {
    data: {
        isAuthentication: boolean;
        user: TypeUser | null;
        prePath: string;
    };
    method: {
        setAuth(options?: Partial<App.ModuleAuth.Hook.AuthContext['data']>): void;
        setPrePath(path: string): void;
    };
};
