/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib */
import { collection, doc, getDoc, getDocs, limit, query, setDoc } from 'firebase/firestore';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { firebaseRef } from '@module-base/constants/firebaseRef';

/** utils */
import { firestore } from '@module-base/utils/firebaseApp';
import { delay } from '@module-base/utils/delay';

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types';
import type { TypeUserApi, TypeUser } from '@module-user/types';

const apiCreateUser = async (payload: TypeUserApi['Create']['Payload']): Promise<TypeUserApi['Create']['Response']> => {
    const { timer = AppTimer.pendingApi, user } = payload;
    const docRef = doc(firestore, firebaseRef.user, user.uid);
    const create = () => setDoc(docRef, user, { merge: true });
    await Promise.all([create(), delay(timer)]);
};

const apiGetUser = async (payload: TypeUserApi['Get']['Payload']): Promise<TypeUserApi['Get']['Response']> => {
    const { timer = AppTimer.pendingApi, uid } = payload;
    const docRef = doc(firestore, firebaseRef.user, uid);
    const [response] = await Promise.all([getDoc(docRef), delay(timer)]);
    return response.exists() ? (response.data() as TypeUser) : undefined;
};

const apiGetListUser = async (payload: TypeUserApi['GetList']['Payload']): Promise<TypeUserApi['GetList']['Response']> => {
    const { timer = AppTimer.pendingApi, limit: lim = 20 } = payload;
    const getListUser = async () => {
        const docRef = collection(firestore, firebaseRef.user);
        const querySnapshot = await getDocs(query(docRef, limit(lim)));
        const itemIds: TypeItemIds = [];
        const items: TypeItems<TypeUser> = {};
        querySnapshot.forEach((doc) => {
            const uid = doc.id;
            itemIds.push(uid);
            items[uid] = doc.data() as TypeUser;
        });
        return { itemIds, items };
    };
    const [response] = await Promise.all([getListUser(), delay(timer)]);
    return response;
};

export const userFirebaseApi = {
    get: apiGetUser,
    getList: apiGetListUser,
    create: apiCreateUser,
} as const;
