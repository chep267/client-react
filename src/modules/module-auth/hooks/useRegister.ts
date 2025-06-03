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

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';

/** types */
import type { AxiosError } from 'axios';

export function useRegister() {
    const hookNotify = useNotify();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            hookNotify.method.toggleNotify({
                open: true,
                color: 'success',
                messageIntl: AuthLanguage.notify.register.success,
            });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            hookNotify.method.toggleNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}
