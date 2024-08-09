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
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify.ts';
import { useAuth } from '@module-auth/hooks/useAuth.ts';

/** types */
import type { AxiosError } from '@module-base/types';
import type { TypeApiAuth } from '@module-auth/types';

export function useRestart() {
    const AUTH = useAuth();
    const NOTIFY = useNotify();

    const RESTART = useMutation({
        mutationFn: authApi.restart,
        onSuccess: async (response: TypeApiAuth['Restart']['Response']) => {
            AUTH.method.setAuth({ isAuthentication: true, user: response.data.user });
            debounce(response.data.token.exp, () => RESTART.mutate({})).then();
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
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'error',
                messageIntl,
            });
            AUTH.method.setAuth();
        },
    });

    return RESTART;
}
