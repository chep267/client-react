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

/** stores */
import { useNotifyStore } from '@module-base/stores/useNotifyStore';

export function useCreateUser() {
    const notifyAction = useNotifyStore(({ action }) => action);

    return useMutation({
        mutationFn: userApi.create,
        onSuccess: () => {
            notifyAction.openNotify({
                open: true,
                color: 'success',
                message: 'ok',
            });
        },
        onError: () => {
            notifyAction.openNotify({
                open: true,
                color: 'error',
                messageIntl: BaseLanguage.component.label.error.server,
            });
        },
    });
}
