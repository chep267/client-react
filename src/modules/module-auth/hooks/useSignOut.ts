/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth.ts';

export function useSignOut() {
    const AUTH = useAuth();

    const SIGN_OUT = useMutation({
        mutationFn: authApi.signout,
        retry: 3,
        onSettled: () => {
            Cookies.remove(AppKey.uid);
            AUTH.method.setAuth();
        },
    });

    return { isAuthentication: AUTH.data.isAuthentication, ...SIGN_OUT };
}
