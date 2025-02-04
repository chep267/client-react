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
} from 'firebase/auth';
import dayjs from 'dayjs';

/** apis */
import { userFirebaseApi } from '@module-user/apis/api.firebase';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { debounce } from '@module-base/utils/debounce';
import { validateId } from '@module-base/utils/validateId';
import { authentication } from '@module-base/utils/firebaseApp';

/** types */
import type { TypeApiAuth } from '@module-auth/types';

const apiSignIn = async (payload: TypeApiAuth['SignIn']['Payload']): Promise<TypeApiAuth['SignIn']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const [response] = await Promise.all([signInWithEmailAndPassword(authentication, email, password), debounce(timer)]);
    if (!response?.user) {
        throw new Error('sign in error!');
    }

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
    return {
        data: {
            user,
            token: {
                exp: dayjs().set('month', 1).valueOf(),
            },
        },
        message: '',
        status: 200,
    };
};

const apiSignOut = async (payload: TypeApiAuth['SignOut']['Payload']): Promise<TypeApiAuth['SignOut']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const [response] = await Promise.all([signOut(authentication), debounce(timer)]);
    return response;
};

const apiRegister = async (payload: TypeApiAuth['Register']['Payload']): Promise<TypeApiAuth['Register']['Response']> => {
    const { timer = AppTimer.pendingApi, email, password } = payload;
    const [response] = await Promise.all([createUserWithEmailAndPassword(authentication, email, password), debounce(timer)]);
    return {
        data: response,
        message: '',
        status: 200,
    };
};

const apiRecover = async (payload: TypeApiAuth['Recover']['Payload']): Promise<TypeApiAuth['Recover']['Response']> => {
    const { timer = AppTimer.pendingApi, email } = payload;
    const [response] = await Promise.all([sendPasswordResetEmail(authentication, email), debounce(timer)]);
    return {
        data: response,
        message: '',
        status: 200,
    };
};

const apiRestart = async (payload: TypeApiAuth['Restart']['Payload']): Promise<TypeApiAuth['Restart']['Response']> => {
    const { timer = AppTimer.pendingApi } = payload;
    const [response] = await Promise.all([onAuthStateChanged(authentication, () => {}), debounce(timer)]);
    const currentUser = authentication.currentUser;
    if (!response || !currentUser) {
        throw new Error('restart error!');
    }

    const uid = validateId(currentUser.uid, 'uid');
    let user = await userFirebaseApi.get({ uid, timer: 0 });
    if (!user) {
        user = {
            uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            providerId: currentUser.providerId,
            photoURL: currentUser.photoURL,
            phoneNumber: currentUser.phoneNumber,
        };
        await userFirebaseApi.create({ user });
    }
    return {
        data: {
            user,
            token: {
                exp: dayjs().set('month', 1).valueOf(),
            },
        },
        message: '',
        status: 200,
    };
};

export const authFirebaseApi = {
    signIn: apiSignIn,
    signOut: apiSignOut,
    restart: apiRestart,
    register: apiRegister,
    recover: apiRecover,
} as const;
