/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** apis */
import { userApi } from '@module-user/apis';

/** utils */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';

export function useCreateUser() {
    const NOTIFY = useNotify();

    return useMutation({
        mutationFn: userApi.create,
        onSuccess: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                color: 'success',
                message: 'ok',
            });
        },
        onError: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                color: 'error',
                messageIntl: BaseLanguage.component.label.error.server,
            });
        },
    });
}
