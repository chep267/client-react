/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** apis */
import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { firebaseRef } from '@module-base/constants/firebaseRef';

/** utils */
import { firestore, storage } from '@module-base/utils/firebaseApp';
import { delay } from '@module-base/utils/delay';

/** types */
import type { MessengerApiProps, TypeDocumentMessageData } from '@module-messenger/types';
import type { TypeItemIds, TypeItems } from '@module-base/types';

const apiCreateMessage = async (
    payload: MessengerApiProps['CreateMessage']['Payload']
): Promise<MessengerApiProps['CreateMessage']['Response']> => {
    const { uid, tid, mid, data } = payload;
    const docRef = doc(
        firestore,
        firebaseRef.messenger,
        uid,
        `${firebaseRef.thread}-${firebaseRef.message}`,
        tid,
        firebaseRef.message,
        mid
    );
    await setDoc(docRef, data, { merge: true });
    return { message: data };
};

const apiSendFile = async (
    payload: MessengerApiProps['SendFile']['Payload']
): Promise<MessengerApiProps['SendFile']['Response']> => {
    const { tid, mid, fid, file } = payload;
    const storageRef = ref(
        storage,
        `${firebaseRef.messenger}/${firebaseRef.thread}/${tid}/${firebaseRef.message}/${mid}/${fid}`
    );
    const snapshot = await uploadBytes(storageRef, file.fileData as File);
    const url = await getDownloadURL(snapshot.ref);
    return { fid, url };
};

export const messageApi = {
    create: apiCreateMessage,
    sendFile: apiSendFile,
} as const;
