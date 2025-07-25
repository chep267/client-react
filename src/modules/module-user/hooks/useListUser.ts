/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useQuery } from '@tanstack/react-query';

/** services */
import { userServices } from '@module-user/services';

export function useListUser() {
    const uid = '';

    return useQuery({
        queryKey: ['useListUser', { uid }],
        queryFn: () => userServices.getList(),
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnReconnect: false,
        refetchInterval: 1000 * 60 * 5, // 5 minutes
    });
}
