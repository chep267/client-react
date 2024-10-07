/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    getAuth,
} from 'firebase/auth';

/** apis */
import { userFirebaseApi } from '@module-user/apis/api.firebase';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer.ts';

/** utils */
import { debounce } from '@module-base/utils/debounce';
import { validateId } from '@module-base/utils/validateId.ts';
import { firebaseApp } from '@module-base/utils/firebaseApp.ts';

/** types */
import type { TypeApiAuth } from '@module-auth/types';

export const authentication = getAuth(firebaseApp);

const apiSignin = async (payload: TypeApiAuth['Signin']['Payload']): Promise<TypeApiAuth['Signin']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const [response] = await Promise.all([signInWithEmailAndPassword(authentication, email, password), debounce(timer)]);
    if (response?.user) {
        const uid = validateId(response.user.uid, 'uid');
        let user = await userFirebaseApi.get({ uid, timer: 0 });
        if (!user) {
            user = {
                uid,
                email: response.user.email || email,
                displayName: response.user.displayName || email.slice(0, email.indexOf('@')),
                providerId: response.user.providerId,
                photoURL: response.user.photoURL,
                phoneNumber: response.user.phoneNumber,
            };
            await userFirebaseApi.create({ user });
        }
    }

    console.log('response: ', response);
    return response;
};

const apiSignout = async (payload: TypeApiAuth['SignOut']['Payload']): Promise<TypeApiAuth['SignOut']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const [response] = await Promise.all([signOut(authentication), debounce(timer)]);
    return response;
};

const apiRegister = async (payload: TypeApiAuth['Register']['Payload']): Promise<TypeApiAuth['Register']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const [response] = await Promise.all([createUserWithEmailAndPassword(authentication, email, password), debounce(timer)]);
    return response;
};

const apiRecover = async (payload: TypeApiAuth['Recover']['Payload']): Promise<TypeApiAuth['Recover']['Response']> => {
    const { timer = AppTimer.pendingApi, email } = payload;
    const [response] = await Promise.all([sendPasswordResetEmail(authentication, email), debounce(timer)]);
    return response;
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi, fnCallback } = payload;
    return onAuthStateChanged(authentication, async (user) => {
        if (user) {
            await debounce(timer);
            fnCallback(user);
        }
    });
};

export const authFirebaseApi = {
    signin: apiSignin,
    signout: apiSignout,
    restart: apiRestart,
    register: apiRegister,
    recover: apiRecover,
} as const;
