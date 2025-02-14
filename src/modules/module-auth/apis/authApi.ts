/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** apis */
import { baseApi } from '@module-base/apis/baseApi';
import { authFirebaseApi } from '@module-auth/apis/auth.firebase.api';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { AuthApiPath } from '@module-auth/constants/AuthApiPath';
import { AppEnv } from '@module-base/constants/AppEnv';

/** utils */
import { delay } from '@module-base/utils/delay';

/** types */
import type { TypeApiAuth } from '@module-auth/types';

const apiSignin = async (payload: TypeApiAuth['Signin']['Payload']): Promise<TypeApiAuth['Signin']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Signin']['Response']>({
            method: 'post',
            url: AuthApiPath.signin,
            data: { email, password },
        });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

const apiSignOut = async (payload: TypeApiAuth['SignOut']['Payload']): Promise<TypeApiAuth['SignOut']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<Promise<TypeApiAuth['SignOut']['Response']>>({ method: 'post', url: AuthApiPath.signOut });
    };
    await Promise.all([callApi(), delay(timer)]);
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const callApi = () => {
        return baseApi<TypeApiAuth['Restart']['Response']>({ method: 'post', url: AuthApiPath.restart });
    };
    const [res] = await Promise.all([callApi(), delay(timer)]);
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
    const [res] = await Promise.all([callApi(), delay(timer)]);
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
    const [res] = await Promise.all([callApi(), delay(timer)]);
    return res;
};

export const authApi = !AppEnv.isFirebase
    ? ({
          signin: apiSignin,
          signOut: apiSignOut,
          restart: apiRestart,
          register: apiRegister,
          recover: apiRecover,
      } as const)
    : authFirebaseApi;
