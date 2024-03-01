/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

/** apis */
import { authApi } from '@module-auth/apis';

/** constants */
import { AppKey } from '@module-base/constants';
import { AccountState, AuthScreenPath } from '@module-auth/constants';

/** hooks */
import { useAuth } from '@module-auth/hooks';

/** types */
import type { PropsWithChildren } from 'react';

/** screens */
const StartScreen = React.lazy(() => import('@module-base/components/StartLoading'));
const SigninScreen = React.lazy(() => import('@module-auth/screens/SigninScreen'));

export default function AuthRoute(props: PropsWithChildren) {
    const { children } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const AUTH = useAuth();
    const accessToken = Cookies.get(AppKey.accessToken);

    const accountState = AUTH.data.isAuth ? AccountState.signedIn : accessToken ? AccountState.reSignin : AccountState.signin;

    React.useEffect(() => {
        if (accountState === AccountState.reSignin) {
            /** đã đăng nhập từ trước, lấy phiên đăng nhập */
            authApi.restart({}).then(() => {
                // @ts-ignore
                AUTH.method.setAuth({ isAuth: true, me: { email: 'dong', uid: 'dong' } });
            });
        }
        if (accountState === AccountState.signedIn && Object.values(AuthScreenPath).includes(pathname as any)) {
            navigate(AuthScreenPath.home, { replace: true });
        }
    }, [accountState, pathname]);

    return React.useMemo(() => {
        return (
            <React.Suspense>
                {accountState === AccountState.signedIn ? (
                    children
                ) : accountState === AccountState.reSignin ? (
                    <StartScreen />
                ) : (
                    <SigninScreen />
                )}
            </React.Suspense>
        );
    }, [accountState]);
}
