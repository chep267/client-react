/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { PropsWithChildren } from 'react';

/** screens */
const StartScreen = React.lazy(() => import('@module-auth/screens/StartScreen'));
const SignInScreen = React.lazy(() => import('@module-auth/screens/SignInScreen'));

export default function AuthRoute(props: PropsWithChildren) {
    const { children } = props;

    const { pathname } = useLocation() as { pathname: (typeof AuthRouterPath)[keyof typeof AuthRouterPath] };
    const navigate = useNavigate();
    const hookAuth = useAuth();

    const { isAuthentication, prePath } = hookAuth.data;

    const uid = Cookies.get(AppKey.uid);
    const accountState = isAuthentication ? AccountState.signedIn : uid ? AccountState.reSignIn : AccountState.signIn;

    React.useEffect(() => {
        if (accountState === AccountState.reSignIn && !pathname.startsWith(AuthRouterPath.start)) {
            /** đã đăng nhập từ trước, lấy phiên đăng nhập */
            hookAuth.method.setPrePath(pathname);
            navigate(AuthRouterPath.start, { replace: true });
        }
        if (accountState === AccountState.signedIn && Object.values(AuthRouterPath).includes(pathname)) {
            /** đã đăng nhập xong, vào home */
            navigate(prePath, { replace: true });
        }
        if (accountState === AccountState.signIn && !Object.values(AuthRouterPath).includes(pathname)) {
            /** chưa đăng nhập, trở về đăng nhập  */
            navigate(AuthRouterPath.signIn, { replace: true });
        }
    }, [accountState, pathname]);

    return (
        <React.Suspense>
            {accountState === AccountState.signedIn ? (
                children
            ) : accountState === AccountState.reSignIn ? (
                <StartScreen />
            ) : (
                <SignInScreen />
            )}
        </React.Suspense>
    );
}
