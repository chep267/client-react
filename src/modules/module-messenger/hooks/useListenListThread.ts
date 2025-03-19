/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

/** apis */
import { apiOnGetListThread } from '@module-messenger/apis';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types';
import type { TypeDocumentThreadData } from '@module-messenger/types';

export function useListenListThread() {
    const queryClient = useQueryClient();
    const AUTH = useAuth();
    const [itemIds, setItemIds] = React.useState<TypeItemIds>(AppDefaultValue.emptyArray);
    const [items, setItems] = React.useState<TypeItems<TypeDocumentThreadData>>(AppDefaultValue.emptyObject);

    const uid = AUTH.data.user?.uid as string;

    const testIds = React.useMemo<TypeItemIds>(() => {
        return Array.from({ length: 1000 }, (_, index) => `${index}`);
    }, []);

    const tests = React.useMemo<TypeItems<TypeDocumentThreadData>>(() => {
        const output = {};
        testIds.forEach((index) => {
            output[index] = {
                tid: `tid.${index}`,
                name: `User ${index}`,
                type: 'thread',
                members: [],
                lastMessage: {
                    uid: `tid.${index}`,
                    tid: `tid.${index}`,
                    mid: `mid.${index}`,
                    text: 'abc',
                    fileIds: [],
                    files: {},
                    createdTime: Date.now(),
                    updatedTime: Date.now(),
                    type: 'text',
                },
            };
        });
        return output;
    }, [testIds]);

    const hookListenListThread = useQuery({
        queryKey: ['useListenListThread', { uid }],
        queryFn: () => {
            return apiOnGetListThread({
                uid,
                fnCallback: (data) => {
                    setItemIds(data.itemIds);
                    setItems(data.items);
                },
            });
        },
        enabled: false,
        refetchOnWindowFocus: false,
    });

    React.useEffect(() => {
        if (uid) {
            hookListenListThread.refetch().then();
        }
        return () => {
            hookListenListThread.data?.unsubscribe?.();
        };
    }, [uid]);

    React.useEffect(() => {
        queryClient.setQueryData(['useListThread', { uid }], {
            itemIds,
            items,
        });
    }, [itemIds, items]);

    return {
        ...hookListenListThread,
        data: { itemIds: testIds, items: tests },
    };
}
