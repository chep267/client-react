/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis';

/** constants */
import { AppKey } from '@module-base/constants';

/** hooks */
import { useAuth } from '@module-auth/hooks';

export function useSignout() {
    const AUTH = useAuth();

    const SIGN_OUT = useMutation({
        mutationFn: authApi.signout,
        retry: 3,
        onSettled: () => {
            Cookies.remove(AppKey.accessToken);
            AUTH.method.setAuth();
        },
    });

    return { isAuth: AUTH.data.isAuth, ...SIGN_OUT };
}
