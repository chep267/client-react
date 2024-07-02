/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify.ts';
import { useAuth } from '@module-auth/hooks/useAuth.ts';

/** types */
import type { AxiosError } from '@module-base/models';
import type { TypeApiAuth } from '@module-auth/models';

export function useSignIn() {
    const AUTH = useAuth();
    const NOTIFY = useNotify();

    return useMutation({
        mutationFn: authApi.signin,
        onSuccess: async (response: TypeApiAuth['Signin']['Response']) => {
            const { user } = response.data;
            Cookies.set(AppKey.uid, user.uid);
            Cookies.set(AppKey.email, `${user.email}`);
            AUTH.method.setAuth({ isAuthentication: true, user: response.data.user });
        },
        onError: (error: AxiosError) => {
            let intlMessage = '';
            const code = Number(error?.response?.status);
            switch (true) {
                case !code || code >= 500:
                    intlMessage = 'module.auth.notify.server.error';
                    break;
                case code >= 400:
                    intlMessage = 'module.auth.notify.signin.error';
                    break;
                default:
                    break;
            }
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'error',
                intlMessage,
            });
        },
    });
}
