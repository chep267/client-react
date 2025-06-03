/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { collection, doc, onSnapshot, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

/** apis */
import { messageApi } from './messageApi';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { firebaseRef } from '@module-base/constants/firebaseRef';
import { ChatBotGPT, MessageGPT } from '@module-messenger/constants';

/** utils */
import { validateId } from '@module-base/utils/validateId';
import { firestore } from '@module-base/utils/firebaseApp';
import { delay } from '@module-base/utils/delay';
import { genMessage } from '@module-messenger/utils/genMessage';

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types';
import type { MessengerApiProps, TypeDocumentThreadData } from '@module-messenger/types';

export const apiOnGetListThread = async (
    payload: MessengerApiProps['GetListThread']['Payload']
): Promise<MessengerApiProps['GetListThread']['Response']> => {
    const { timer = AppTimer.pendingApi, uid, fnCallback } = payload;
    const docRef = collection(firestore, firebaseRef.messenger, uid, `${firebaseRef.thread}-${firebaseRef.info}`);

    const onGet = () => {
        const unsubscribe = onSnapshot(query(docRef), (querySnapshot) => {
            const itemIds: TypeItemIds = [];
            const items: TypeItems<TypeDocumentThreadData> = {};
            querySnapshot.forEach((doc) => {
                const tid = doc.id;
                itemIds.unshift(tid);
                items[tid] = doc.data() as TypeDocumentThreadData;
            });
            if (!itemIds.includes(ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID)) {
                itemIds.unshift(ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID);
                const dataGPT = genMessage({
                    tid: ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID,
                    uid: ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID,
                    text: MessageGPT['start'],
                    mid: ChatBotGPT.MID_GPT_START,
                    isEncrypt: true,
                });
                messageApi.create({
                    uid,
                    tid: ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID,
                    mid: dataGPT.mid,
                    data: dataGPT,
                });
                return apiCreateThread({
                    tid: ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID,
                    uid,
                    data: {
                        type: 'thread',
                        tid: ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID,
                        name: 'Chep GPT',
                        members: [uid, validateId(ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID, 'uid')],
                    },
                });
            }
            fnCallback({ itemIds, items });
        });
        return { unsubscribe };
    };
    const [response] = await Promise.all([onGet(), delay(timer)]);
    return response;
};

export const apiCreateThread = async (
    payload: MessengerApiProps['CreateThread']['Payload']
): Promise<MessengerApiProps['CreateThread']['Response']> => {
    const { uid, tid, data } = payload;
    const docRef = doc(firestore, firebaseRef.messenger, uid, `${firebaseRef.thread}-${firebaseRef.info}`, tid);
    return setDoc(docRef, data, { merge: true });
};

export const apiMoveThread = async (
    payload: MessengerApiProps['MoveThread']['Payload']
): Promise<MessengerApiProps['MoveThread']['Response']> => {
    const { uid, tid } = payload;
    const docRef = doc(firestore, firebaseRef.root, firebaseRef.messenger, firebaseRef.user, uid, firebaseRef.thread, tid);
    let thread = {};
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        thread = docSnap.data();
        await deleteDoc(docRef);
    }
    return setDoc(docRef, thread);
};
