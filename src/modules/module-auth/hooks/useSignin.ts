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
import { useNotify } from '@module-base/hooks';
import { useAuth } from '@module-auth/hooks';

export function useSignin() {
    const AUTH = useAuth();
    const NOTIFY = useNotify();

    return useMutation({
        mutationFn: authApi.signin,
        onSuccess: async (response, { email }) => {
            const me = response.user;
            const accessToken = 'accessToken';
            Cookies.set(AppKey.localEmail, email);
            Cookies.set(AppKey.accessToken, accessToken, { expires: 1 });
            AUTH.method.setAuth({ isAuth: true, me });
        },
        onError: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'error',
                intlMessage: 'module.auth.notify.signin.error.4xx',
            });
        },
    });
}
