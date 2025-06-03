/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

/** apis */
import { authApi } from '@module-auth/apis/authApi';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

export function useSignOut() {
    const hookAuth = useAuth();

    const hookSignOut = useMutation({
        mutationFn: authApi.signOut,
        retry: 3,
        onSettled: () => {
            Cookies.remove(AppKey.uid);
            hookAuth.method.setAuth();
        },
    });

    return { isAuthentication: hookAuth.data.isAuthentication, ...hookSignOut };
}
