/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types/data.d';

/** Auth store */
type TypeAuthData = {
    user: TypeUser | null;
    prePath: string;
};
type TypeAuthAction = {
    setData: (options?: Partial<TypeAuthData>) => void;
};
export type TypeAuthStore = {
    data: TypeAuthData;
    action: TypeAuthAction;
};
