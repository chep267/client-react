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
import { AppKey } from '@module-base/constants/AppKey.ts';
import { AccountState } from '@module-auth/constants/AccountState';
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth.ts';

/** types */
import type { PropsWithChildren } from 'react';

/** screens */
const StartScreen = React.lazy(() => import('@module-auth/screens/StartScreen'));
const SignInScreen = React.lazy(() => import('@module-auth/screens/SignInScreen'));

export default function AuthRoute(props: PropsWithChildren) {
    const { children } = props;

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {
        data: { isAuthentication, prePath },
        method: { setPrePath },
    } = useAuth();

    // @ts-ignore
    const uid = Cookies.get(AppKey.uid) as string;
    const accountState = isAuthentication ? AccountState.signedIn : uid ? AccountState.reSignin : AccountState.signin;

    React.useEffect(() => {
        if (accountState === AccountState.reSignin && !pathname.startsWith(AuthScreenPath.start)) {
            /** đã đăng nhập từ trước, lấy phiên đăng nhập */
            setPrePath(pathname);
            navigate(AuthScreenPath.start, { replace: true });
        }
        if (accountState === AccountState.signedIn && Object.values(AuthScreenPath).includes(pathname as any)) {
            /** đã đăng nhập xong, vào home */
            navigate(prePath, { replace: true });
        }
        if (accountState === AccountState.signin && !Object.values(AuthScreenPath).includes(pathname as any)) {
            /** chưa đăng nhập, trở về đăng nhập  */
            navigate(AuthScreenPath.signin, { replace: true });
        }
    }, [accountState, pathname]);

    return (
        <React.Suspense>
            {accountState === AccountState.signedIn ? (
                children
            ) : accountState === AccountState.reSignin ? (
                <StartScreen />
            ) : (
                <SignInScreen />
            )}
        </React.Suspense>
    );
}
