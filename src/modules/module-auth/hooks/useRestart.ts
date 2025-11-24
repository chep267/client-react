/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { delay } from '@module-base/utils/delay';
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** services */
import { authService } from '@module-auth/services';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** types */
import type { AxiosError } from 'axios';

export function useRestart() {
    const settingAction = useSettingStore(({ action }) => action);
    const authAction = useAuthStore(({ action }) => action);
    const uid = Cookies.get(AppKey.uid) || '';

    const hookRestart = useMutation({
        mutationFn: () => authService.restart({ uid }),
        onSuccess: (response) => {
            const { user, token } = response.data;
            const exp = !isNaN(token.exp) ? token.exp : AppTimer.restart;
            authAction.setData({ user });
            delay(exp, () => hookRestart.mutate()).then();
        },
        onError: async (error: AxiosError) => {
            Cookies.remove(AppKey.uid);
            let messageIntl: string;
            switch (true) {
                case isCallApiErrorByClient(error):
                    messageIntl = AuthLanguage.notify.refresh.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            settingAction.changeNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
            authAction.setData({ user: null, prePath: '/' });
        },
    });

    return hookRestart;
}
