/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** services */
import { authService } from '@module-auth/services';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** types */
import type { AxiosError } from 'axios';

export function useRecover() {
    const settingAction = useSettingStore(({ action }) => action);

    return useMutation({
        mutationFn: authService.recover,
        onSuccess: () => {
            settingAction.changeNotify({
                open: true,
                color: 'success',
                messageIntl: AuthLanguage.notify.recover.success,
            });
        },
        onError: (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isCallApiErrorByClient(error):
                    messageIntl = AuthLanguage.notify.recover.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            settingAction.changeNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}
