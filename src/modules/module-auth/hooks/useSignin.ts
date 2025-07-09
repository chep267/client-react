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
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

/** types */
import type { AxiosError } from 'axios';
import { authServices } from '@module-auth/services';

export function useSignin() {
    const hookAuth = useAuth();
    const notifyAction = useNotifyStore(({ action }) => action);

    return useMutation({
        mutationFn: authServices.,
        onSuccess: async (response: App.ModuleAuth.Api.Signin['Response']) => {
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
            notifyAction.openNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}
