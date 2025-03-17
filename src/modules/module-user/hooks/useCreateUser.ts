/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** apis */
import { userFirebaseApi } from '@module-user/apis';

/** utils */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';

export function useCreateUser() {
    const NOTIFY = useNotify();

    return useMutation({
        mutationFn: userFirebaseApi.create,
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
                messageIntl: BaseLanguage.component.label.error.server,
            });
        },
    });
}
