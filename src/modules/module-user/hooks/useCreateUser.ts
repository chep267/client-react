/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useMutation } from '@tanstack/react-query';

/** services */
import { userServices } from '@module-user/services';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** utils */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

export function useCreateUser() {
    const settingAction = useSettingStore(({ action }) => action);

    return useMutation({
        mutationFn: userServices.create,
        onSuccess: () => {
            settingAction.changeNotify({
                open: true,
                color: 'success',
                message: 'ok',
            });
        },
        onError: () => {
            settingAction.changeNotify({
                open: true,
                color: 'error',
                messageIntl: BaseLanguage.component.label.error.server,
            });
        },
    });
}
