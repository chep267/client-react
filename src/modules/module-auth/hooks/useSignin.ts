/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppEnv } from '@module-base/constants/AppEnv';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { AxiosError } from 'axios';
import type { TypeApiAuth } from '@module-auth/types';

export function useSignin() {
    const hookAuth = useAuth();
    const hookNotify = useNotify();

    return useMutation({
        mutationFn: authApi.signin,
        onSuccess: async (response: TypeApiAuth['Signin']['Response']) => {
            const { user } = response.data;
            Cookies.set(AppKey.uid, user.uid);
            Cookies.set(AppKey.email, `${user.email}`);
            hookAuth.method.setAuth({ isAuthentication: true, user });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.signin.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            hookNotify.method.toggleNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}
