/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';

/** apis */
import { userFirebaseApi } from '@module-user/apis';

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

export function useListUser() {
    const queryClient = useQueryClient();
    const AUTH = useAuth();
    const uid = AUTH.data.user?.uid;
    const data = queryClient.getQueryData(['useListUser', { uid }]);

    return useQuery({
        queryKey: ['useListUser', { uid }],
        queryFn: () => userFirebaseApi.getList({}),
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnReconnect: false,
        refetchOnMount: !data,
        refetchInterval: 1000 * 60 * 5, // 5 minutes
    });
}
