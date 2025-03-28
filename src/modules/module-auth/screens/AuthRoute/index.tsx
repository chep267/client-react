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
const AuthScreen = React.lazy(() => import('@module-auth/screens/AuthScreen'));

type TypeAuthPath = (typeof AuthRouterPath)[keyof typeof AuthRouterPath];

export default function AuthRoute(props: PropsWithChildren) {
    const { children } = props;

    const { pathname } = useLocation() as { pathname: TypeAuthPath };
    const navigate = useNavigate();
    const hookAuth = useAuth();

    const { isAuthentication, prePath } = hookAuth.data;

    const uid = Cookies.get(AppKey.uid);
    const accountState = isAuthentication ? AccountState.signedIn : uid ? AccountState.reSignin : AccountState.signin;

    React.useEffect(() => {
        if (accountState === AccountState.signin && !Object.values(AuthRouterPath).includes(pathname)) {
            /** chưa đăng nhập, trở về đăng nhập  */
            hookAuth.method.setPrePath(Object.values(AuthRouterPath).includes(pathname) ? '/' : pathname);
            navigate(AuthRouterPath.signin, { replace: true });
        }
        if (accountState === AccountState.reSignin && !pathname.startsWith(AuthRouterPath.start)) {
            /** đã đăng nhập từ trước, lấy phiên đăng nhập */
            hookAuth.method.setPrePath(Object.values(AuthRouterPath).includes(pathname) ? '/' : pathname);
            navigate(AuthRouterPath.start, { replace: true });
        }
        if (accountState === AccountState.signedIn && Object.values(AuthRouterPath).includes(pathname)) {
            /** đã đăng nhập xong, vào home */
            navigate(prePath, { replace: true });
        }
    }, [accountState, pathname]);

    return (
        <React.Suspense>
            {accountState === AccountState.signedIn ? (
                children
            ) : accountState === AccountState.reSignin ? (
                <StartScreen />
            ) : (
                <AuthScreen />
            )}
        </React.Suspense>
    );
}
