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

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify.ts';
import { useAuth } from '@module-auth/hooks/useAuth.ts';

/** types */
import type { AxiosError } from '@module-base/models';
import type { TypeApiAuth } from '@module-auth/models';

export function useRestart() {
    const AUTH = useAuth();
    const NOTIFY = useNotify();

    const RESTART = useMutation({
        mutationFn: authApi.restart,
        onSuccess: async (response: TypeApiAuth['Restart']['Response']) => {
            AUTH.method.setAuth({ isAuth: true, me: response.data.user });
            debounce(response.data.token.exp, () => RESTART.mutate({})).then();
        },
        onError: async (error: AxiosError) => {
            let intlMessage = '';
            const code = Number(error?.response?.status);
            Cookies.remove(AppKey.uid);
            switch (true) {
                case !code || code >= 500:
                    intlMessage = 'module.auth.notify.server.error';
                    break;
                case code >= 400:
                    intlMessage = 'module.auth.notify.refresh.error';
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

    return RESTART;
}
