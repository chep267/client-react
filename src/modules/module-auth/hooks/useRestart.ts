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

/** utils */
import { debounce } from '@module-base/utils/debounce';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { AxiosError } from '@module-base/types';
import type { TypeApiAuth } from '@module-auth/types';
import { AppTimer } from '@module-base/constants/AppTimer';

export function useRestart() {
    const hookAuth = useAuth();
    const hookNotify = useNotify();

    const RESTART = useMutation({
        mutationFn: authApi.restart,
        onSuccess: async (response: TypeApiAuth['Restart']['Response']) => {
            const exp = !isNaN(response.data.token.exp) ? response.data.token.exp : AppTimer.restart;
            hookAuth.method.setAuth({ isAuthentication: true, user: response.data.user });
            debounce(exp, () => RESTART.mutate({})).then();
        },
        onError: async (error: AxiosError) => {
            Cookies.remove(AppKey.uid);
            const code = Number(error?.response?.status);
            let messageIntl;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.refresh.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            hookNotify.method.toggleNotify({
                open: true,
                mode: 'error',
                messageIntl,
            });
            hookAuth.method.setAuth();
        },
    });

    return RESTART;
}
