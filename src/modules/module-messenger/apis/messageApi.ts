/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** apis */
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

/** constants */
import { firebaseRef } from '@module-base/constants/firebaseRef';

/** utils */
import { firestore, storage } from '@module-base/utils/firebaseApp';

/** types */
import type { MessengerApiProps } from '@module-messenger/types';

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
