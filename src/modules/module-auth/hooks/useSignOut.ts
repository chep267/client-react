/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

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
