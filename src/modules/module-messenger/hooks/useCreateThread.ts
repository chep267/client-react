/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';

/** apis */
import { apiCreateThread } from '@module-messenger/apis';

/** utils */
import { validateId } from '@module-base/utils/validateId';

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types';
import type { TypeDocumentThreadData } from '@module-messenger/types';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

type TypeListThread =
    | {
          itemIds: TypeItemIds;
          items: TypeItems<TypeDocumentThreadData>;
      }
    | undefined;

export function useCreateThread() {
    const queryClient = useQueryClient();
    const AUTH = useAuth();
    const NOTIFY = useNotify();
    const uid = AUTH.data.user?.uid as string;
    const LIST_THREAD: TypeListThread = queryClient.getQueryData(['useListThread', { uid }]);

    return useMutation({
        mutationFn: (payload: TypeDocumentThreadData) => {
            const { tid } = payload;
            const p_uid = validateId(tid, 'uid');
            const p_tid = validateId(uid, 'tid');
            let data: TypeDocumentThreadData = { ...payload };

            if (LIST_THREAD?.itemIds?.includes?.(tid)) {
                const thread = LIST_THREAD?.items?.[tid];
                data = {
                    ...thread,
                    ...data,
                };
            }

            return Promise.all([
                /** create for me */
                apiCreateThread({
                    uid,
                    tid,
                    data: {
                        type: 'thread',
                        members: [uid, p_uid],
                        ...data,
                    },
                }),
                /** create for partner */
                apiCreateThread({
                    uid: p_uid,
                    tid: p_tid,
                    data: {
                        members: [uid, p_uid],
                        ...data,
                        tid: p_tid,
                    },
                }),
            ]);
        },
        onError: () => {
            NOTIFY.method.toggleNotify({
                open: true,
                color: 'error',
                messageIntl: BaseLanguage.component.label.error.server,
            });
        },
    });
}
