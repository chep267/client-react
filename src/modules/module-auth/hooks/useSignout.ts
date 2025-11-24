/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

/** services */
import { authService } from '@module-auth/services';

/** stores */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

export function useSignout() {
    const authAction = useAuthStore(({ action }) => action);
    const uid = Cookies.get(AppKey.uid) || '';

    return useMutation({
        mutationFn: () => authService.signout({ uid }),
        retry: 3,
        onSettled: () => {
            Cookies.remove(AppKey.uid);
            authAction.setData({ user: null, prePath: '/' });
        },
    });
}
