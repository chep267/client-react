/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** lib */
// import { collection, doc, getDoc, getDocs, limit, query, setDoc } from 'firebase/firestore';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
// import { firebaseRef } from '@module-base/constants/firebaseRef';

/** utils */
// import { firestore } from '@module-base/utils/firebaseApp';
import { delay } from '@module-base/utils/delay';

const apiCreateUser = async (
    payload: App.ModuleUser.Api.Create['Payload']
): Promise<App.ModuleUser.Api.Create['Response']> => {
    const { timer = AppTimer.pendingApi, user } = payload;
    // const docRef = doc(firestore, firebaseRef.user, user.uid);
    const create = () => {
        // setDoc(docRef, user, { merge: true })
        return user;
    };
    await Promise.all([create(), delay(timer)]);
};

const apiGetUser = async (payload: App.ModuleUser.Api.Get['Payload']): Promise<App.ModuleUser.Api.Get['Response']> => {
    const { timer: _timer = AppTimer.pendingApi, uid: _uid } = payload;
    // const docRef = doc(firestore, firebaseRef.user, uid);
    // const [response] = await Promise.all([getDoc(docRef), delay(timer)]);
    // return response.exists() ? (response.data() as TypeUser) : undefined;
    return {} as App.ModuleUser.Data.User;
};

const apiGetListUser = async (
    payload: App.ModuleUser.Api.GetList['Payload']
): Promise<App.ModuleUser.Api.GetList['Response']> => {
    const { timer = AppTimer.pendingApi, limit: _lim = 20 } = payload;
    const getListUser = async () => {
        // const docRef = collection(firestore, firebaseRef.user);
        // const querySnapshot = await getDocs(query(docRef, limit(lim)));
        const itemIds: App.ModuleBase.Data.ItemIds = [];
        const items: App.ModuleBase.Data.Items<App.ModuleUser.Data.User> = {};
        // querySnapshot.forEach((doc) => {
        //     const uid = doc.id;
        //     itemIds.push(uid);
        //     items[uid] = doc.data() as TypeUser;
        // });
        return { itemIds, items };
    };
    const [response] = await Promise.all([getListUser(), delay(timer)]);
    return response;
};

export const userApi = {
    get: apiGetUser,
    getList: apiGetListUser,
    create: apiCreateUser,
} as const;
