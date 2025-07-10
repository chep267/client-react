/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { QueryClient } from '@tanstack/react-query';

/** Create a client */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchInterval: false,
            refetchOnReconnect: false,
            retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
        },
    },
});
