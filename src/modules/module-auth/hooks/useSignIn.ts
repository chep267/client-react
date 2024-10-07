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
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { AxiosError } from '@module-base/types';
import type { TypeApiAuth } from '@module-auth/types';

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
            const code = Number(error?.response?.status || error?.code);
            let messageIntl: string;
            console.log('code: ', error);
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.signin.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'error',
                messageIntl,
            });
        },
    });
}
