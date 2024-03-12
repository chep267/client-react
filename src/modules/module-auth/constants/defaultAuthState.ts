/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { User } from 'firebase/auth';
import type { AuthContextProps } from '@module-auth/models';

export const defaultAuthState = Object.freeze<AuthContextProps['data']>({
    isAuthentication: false,
    user: {} as User,
    prePath: '/',
});
