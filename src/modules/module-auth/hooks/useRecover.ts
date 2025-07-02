/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

/** types */
import type { AxiosError } from 'axios';

export function useRecover() {
    const notifyAction = useNotifyStore(({ action }) => action);

    return useMutation({
        mutationFn: authApi.recover,
        onSuccess: () => {
            notifyAction.openNotify({
                open: true,
                color: 'success',
                messageIntl: AuthLanguage.notify.recover.success,
            });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.recover.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            notifyAction.openNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}
