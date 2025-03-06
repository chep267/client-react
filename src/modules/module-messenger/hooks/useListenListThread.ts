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

    const LIST_THREAD = useQuery({
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
            LIST_THREAD.refetch().then();
        }
        return () => {
            LIST_THREAD.data?.unsubscribe?.();
        };
    }, [uid]);

    React.useEffect(() => {
        queryClient.setQueryData(['useListThread', { uid }], {
            itemIds,
            items,
        });
    }, [itemIds, items]);

    return {
        ...LIST_THREAD,
        data: { itemIds, items },
    };
}
