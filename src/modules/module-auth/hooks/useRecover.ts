/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi.ts';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify.ts';

/** types */
import type { AxiosError } from '@module-base/types';

export function useRecover() {
    const NOTIFY = useNotify();

    return useMutation({
        mutationFn: authApi.recover,
        onSuccess: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'success',
                messageIntl: AuthLanguage.notify.recover.success,
            });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl;
            switch (true) {
                case code >= 400 && code < 500:
                    messageIntl = AuthLanguage.notify.recover.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'error',
                messageIntl,
            });
        },
    });
}
