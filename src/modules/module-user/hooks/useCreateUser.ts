/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useMutation } from '@tanstack/react-query';

/** apis */
import { apiCreateUser } from '@module-user/apis/userApi.ts';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify.ts';

export function useCreateUser() {
    const NOTIFY = useNotify();

    return useMutation({
        mutationFn: apiCreateUser,
        onSuccess: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'success',
                message: 'ok',
            });
        },
        onError: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'error',
                intlMessage: 'module.base.error.server.busy',
            });
        },
    });
}
