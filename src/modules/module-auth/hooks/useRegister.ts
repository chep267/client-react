/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** constants */
import { AppNotifyColor } from '@module-base/constants/AppNotifyColor';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { isCallApiErrorByClient } from '@module-base/utils/isClientCallApiError';

/** services */
import { authService } from '@module-auth/services';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** types */
import type { AxiosError } from 'axios';

export function useRegister() {
    const settingAction = useSettingStore(({ action }) => action);

    return useMutation({
        mutationFn: authService.register,
        onSuccess: () => {
            settingAction.changeNotify({
                open: true,
                color: AppNotifyColor.success,
                messageIntl: AuthLanguage.notify.register.success,
            });
        },
        onError: (error: AxiosError) => {
            let messageIntl: string;
            switch (true) {
                case isCallApiErrorByClient(error):
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            settingAction.changeNotify({
                open: true,
                color: AppNotifyColor.error,
                messageIntl,
            });
        },
    });
}
