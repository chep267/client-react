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
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { delay } from '@module-base/utils/delay';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

/** types */
import type { AxiosError } from 'axios';

export function useRestart() {
    const hookAuth = useAuth();
    const notifyAction = useNotifyStore(({ action }) => action);

    const hookRestart = useMutation({
        mutationFn: authApi.restart,
        onSuccess: async (response: App.ModuleAuth.Api.Restart['Response']) => {
            const exp = !isNaN(response.data.token.exp) ? response.data.token.exp : AppTimer.restart;
            hookAuth.method.setAuth({ isAuthentication: true, user: response.data.user });
            delay(exp - 3000 * 60, () => hookRestart.mutate({})).then();
        },
        onError: async (error: AxiosError) => {
            Cookies.remove(AppKey.uid);
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.refresh.error;
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
            hookAuth.method.setAuth();
        },
    });

    return hookRestart;
}
