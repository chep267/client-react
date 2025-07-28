/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AccountState } from '@module-auth/constants/AccountState';
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';

/** useAuthStore */
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** screens */
const StartScreen = React.lazy(() => import('@module-auth/screens/StartScreen'));
const AuthScreen = React.lazy(() => import('@module-auth/screens/AuthScreen'));

export default function AuthRoute(props: React.PropsWithChildren) {
    const { children } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isAuthentication = useAuthStore((store) => Boolean(store.data.user));
    const prePath = useAuthStore((store) => store.data.prePath);
    const authAction = useAuthStore((store) => store.action);

    const uid = Cookies.get(AppKey.uid);
    const accountState = isAuthentication ? AccountState.signedIn : uid ? AccountState.reSignin : AccountState.signin;

    React.useEffect(() => {
        const isAuthPath = Object.values(AuthRouterPath).includes(
            pathname as (typeof AuthRouterPath)[keyof typeof AuthRouterPath]
        );
        if (accountState === AccountState.signin && !isAuthPath) {
            /** chưa đăng nhập, trở về đăng nhập  */
            authAction.setData({ prePath: pathname });
            navigate(AuthRouterPath.signin, { replace: true });
        }
        if (accountState === AccountState.reSignin && pathname !== AuthRouterPath.start) {
            /** đã đăng nhập từ trước, lấy phiên đăng nhập */
            authAction.setData({ prePath: isAuthPath ? '/' : pathname });
            navigate(AuthRouterPath.start, { replace: true });
        }
        if (accountState === AccountState.signedIn && isAuthPath) {
            /** đã đăng nhập xong, vào home */
            navigate(prePath, { replace: true });
        }
    }, [accountState, pathname]);

    return React.useMemo(
        () => (
            <React.Suspense>
                {accountState === AccountState.signedIn ? (
                    children
                ) : accountState === AccountState.reSignin ? (
                    <StartScreen />
                ) : (
                    <AuthScreen />
                )}
            </React.Suspense>
        ),
        [accountState]
    );
}
