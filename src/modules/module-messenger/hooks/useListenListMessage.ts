/**
 *
 * @author dongntd267@gmail.com
 *
 */

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

/** apis */
import { apiOnGetListMessage } from '@module-messenger/apis';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { Unsubscribe } from 'firebase/firestore';
import type { TypeItemIds, TypeItems } from '@module-base/types';
import type { TypeDocumentMessageData } from '@module-messenger/types';

export function useListenListMessage({ tid }: { tid: string }) {
    const AUTH = useAuth();
    const [itemIds, setItemIds] = React.useState<TypeItemIds>(AppDefaultValue.emptyArray);
    const [items, setItems] = React.useState<TypeItems<TypeDocumentMessageData>>(AppDefaultValue.emptyObject);
    const uid = AUTH.data.user?.uid as string;
    const listen = React.useRef<{ unsubscribe?: Unsubscribe }>({ unsubscribe: AppDefaultValue.emptyFunction });

    const LIST_MESSAGE = useQuery({
        queryKey: ['useListenListMessage', { tid }],
        queryFn: async () => {
            listen.current?.unsubscribe?.();
            const response = await apiOnGetListMessage({
                tid: `${tid}`,
                uid,
                fnCallback: (data) => {
                    setItemIds(data.itemIds);
                    setItems(data.items);
                },
            });
            listen.current.unsubscribe = response?.unsubscribe;
            return response;
        },
        enabled: !!tid,
        refetchOnWindowFocus: false,
    });

    return {
        ...LIST_MESSAGE,
        data: { itemIds, items },
    };
}
