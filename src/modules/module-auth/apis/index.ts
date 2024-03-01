/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** apis */
// import { apiCreateUser, apiGetUser } from '@module-user/apis';

/** constants */
import { AppTimer } from '@module-base/constants';

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

/** types */
import type { TypeApiAuth } from '@module-auth/models';

const apiSignin = async (payload: TypeApiAuth['Signin']['Payload']): Promise<TypeApiAuth['Signin']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    await Promise.all([debounce(timer)]);

    if (email === 'dong.nguyenthanh@powergatesoftware.com' && password === 'Midom@2023') {
        return {
            user: { email } as any,
        };
    }
    throw new Error('401');
};

const apiSignout = async (payload: TypeApiAuth['Signout']['Payload']): Promise<TypeApiAuth['Signout']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    await Promise.all([debounce(timer)]);
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    await Promise.all([debounce(timer)]);
    return { status: 'ok' };
};

export const authApi = {
    signin: apiSignin,
    signout: apiSignout,
    restart: apiRestart,
};
