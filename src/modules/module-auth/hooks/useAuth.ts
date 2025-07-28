/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** services */
import { authServices } from '@module-auth/services';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** utils */
import { delay } from '@module-base/utils/delay';

/** types */
import type { AxiosError } from 'axios';

export function useSignin() {
    const settingAction = useSettingStore(({ action }) => action);
    const authAction = useAuthStore(({ action }) => action);

    return useMutation({
        mutationFn: authServices.signin,
        onSuccess: async (response) => {
            const { user } = response.data;
            Cookies.set(AppKey.uid, user.uid);
            Cookies.set(AppKey.email, `${user.email}`);
            authAction.setData({ user });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= HttpStatusCode.BadRequest && code < HttpStatusCode.InternalServerError:
                    messageIntl = AuthLanguage.notify.signin.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            settingAction.changeNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}

export function useSignout() {
    const authAction = useAuthStore(({ action }) => action);

    return useMutation({
        mutationFn: authServices.signout,
        retry: 3,
        onSettled: () => {
            Cookies.remove(AppKey.uid);
            authAction.setData({ user: null, prePath: '/' });
        },
    });
}

export function useRestart() {
    const settingAction = useSettingStore(({ action }) => action);
    const authAction = useAuthStore(({ action }) => action);

    const hookRestart = useMutation({
        mutationFn: authServices.restart,
        onSuccess: (response) => {
            const { user, token } = response.data;
            const exp = !isNaN(token.exp) ? token.exp : AppTimer.restart;
            authAction.setData({ user });
            delay(exp, () => hookRestart.mutate({ uid: user.uid })).then();
        },
        onError: async (error: AxiosError) => {
            Cookies.remove(AppKey.uid);
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= HttpStatusCode.BadRequest && code < HttpStatusCode.InternalServerError:
                    messageIntl = AuthLanguage.notify.refresh.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
                    break;
            }
            settingAction.changeNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
            authAction.setData({ user: null });
        },
    });

    return hookRestart;
}

export function useRecover() {
    const settingAction = useSettingStore(({ action }) => action);

    return useMutation({
        mutationFn: authServices.recover,
        onSuccess: () => {
            settingAction.changeNotify({
                open: true,
                color: 'success',
                messageIntl: AuthLanguage.notify.recover.success,
            });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= HttpStatusCode.BadRequest && code < HttpStatusCode.InternalServerError:
                    messageIntl = AuthLanguage.notify.recover.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            settingAction.changeNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}

export function useRegister() {
    const settingAction = useSettingStore(({ action }) => action);

    return useMutation({
        mutationFn: authServices.register,
        onSuccess: () => {
            settingAction.changeNotify({
                open: true,
                color: 'success',
                messageIntl: AuthLanguage.notify.register.success,
            });
        },
        onError: (error: AxiosError) => {
            const code = Number(error?.response?.status);
            let messageIntl: string;
            switch (true) {
                case code >= HttpStatusCode.BadRequest && code < HttpStatusCode.InternalServerError:
                    messageIntl = AuthLanguage.notify.register.error;
                    break;
                default:
                    messageIntl = AuthLanguage.notify.server.error;
            }
            settingAction.changeNotify({
                open: true,
                color: 'error',
                messageIntl,
            });
        },
    });
}
