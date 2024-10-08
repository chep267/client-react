/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** apis */
import { baseApi } from '@module-base/apis/baseApi';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthApiPath } from '@module-auth/constants/AuthApiPath';

/** utils */
import { debounce } from '@module-base/utils/debounce';

/** types */
import type { TypeApiAuth } from '@module-auth/types';
import { AppEnv } from '@module-base/constants/AppEnv';
import { authFirebaseApi } from '@module-auth/apis/auth.firebase.api';

const apiSignIn = async (payload: TypeApiAuth['SignIn']['Payload']): Promise<TypeApiAuth['SignIn']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['SignIn']['Response']>({
            method: 'post',
            url: AuthApiPath.signIn,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

const apiSignOut = async (payload: TypeApiAuth['SignOut']['Payload']): Promise<TypeApiAuth['SignOut']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<Promise<TypeApiAuth['SignOut']['Response']>>({ method: 'post', url: AuthApiPath.signOut });
    };
    await Promise.all([callApi(), debounce(timer)]);
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Restart']['Response']>({ method: 'post', url: AuthApiPath.restart });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

const apiRegister = async (payload: TypeApiAuth['Register']['Payload']): Promise<TypeApiAuth['Register']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Register']['Response']>({
            method: 'post',
            url: AuthApiPath.register,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

const apiRecover = async (payload: TypeApiAuth['Recover']['Payload']): Promise<TypeApiAuth['Recover']['Response']> => {
    const { timer = AppTimer.pendingApi, email } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Recover']['Response']>({
            method: 'post',
            url: AuthApiPath.recover,
            data: { email },
        });
    };
    const [res] = await Promise.all([callApi(), debounce(timer)]);
    return res;
};

export const authApi =
    AppEnv.apiType === 'firebase'
        ? authFirebaseApi
        : ({
              signIn: apiSignIn,
              signOut: apiSignOut,
              restart: apiRestart,
              register: apiRegister,
              recover: apiRecover,
          } as const);
