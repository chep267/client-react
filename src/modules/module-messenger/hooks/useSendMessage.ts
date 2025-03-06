/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useMutation } from '@tanstack/react-query';

/** apis */
import { apiCreateMessage, apiSendFile } from '@module-messenger/apis';

/** constants */
import { ChatBotGPT, MessageGPT } from '@module-messenger/constants';

/** utils */
import { validateId } from '@module-base/utils/validateId';
import { genMessage } from '@module-messenger/utils/genMessage';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';
import { useAuth } from '@module-auth/hooks/useAuth';
import { useCreateThread } from '@module-messenger/hooks/useCreateThread';

/** types */
import type { TypeDocumentMessageData } from '@module-messenger/types';
import { BaseLanguage } from '@module-base/constants/BaseLanguage.ts';

export function useSendMessage() {
    const AUTH = useAuth();
    const NOTIFY = useNotify();
    const CREATE_THREAD = useCreateThread();
    const uid = AUTH.data.user?.uid as string;

    return useMutation({
        mutationFn: async ({ tid, draft }: { tid: string; draft: TypeDocumentMessageData }) => {
            const data = genMessage({ ...draft, tid, uid, isEncrypt: true });
            if (draft.fileIds.length) {
                /** send file */
                const response = await Promise.all(
                    draft.fileIds.map((fid) => apiSendFile({ tid, mid: data.mid, fid, file: draft.files![fid] }))
                );
                const files: TypeDocumentMessageData['files'] = {};
                response?.map((value) => {
                    if (value) {
                        files[value.fid] = {
                            ...draft.files[value.fid],
                            fileData: null,
                            url: value.url,
                        };
                    }
                });
                data.files = files;
            }
            /** send for me */
            return apiCreateMessage({
                uid,
                tid,
                mid: data.mid,
                data,
            });
        },
        onSuccess: ({ message }, { tid }) => {
            if (tid === ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID) {
                /** chatbot reply */
                const arrText = MessageGPT['random'];
                const text = arrText[Math.floor(Math.random() * arrText.length)];
                const dataGPT = genMessage({ tid, uid: tid, text, isEncrypt: true });
                apiCreateMessage({
                    uid,
                    tid,
                    mid: dataGPT.mid,
                    data: dataGPT,
                }).then();
            } else {
                /** send for partner */
                const p_uid = validateId(tid, 'uid');
                const p_tid = validateId(uid, 'tid');
                apiCreateMessage({
                    uid: p_uid,
                    tid: p_tid,
                    mid: message.mid,
                    data: message,
                }).then();
            }

            /** update for thread */
            CREATE_THREAD.mutate({
                tid,
                lastMessage: message,
            });
        },
        onError: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                mode: 'error',
                messageIntl: BaseLanguage.component.label.error.server,
            });
        },
    });
}
