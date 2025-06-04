/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { QueryClient } from '@tanstack/react-query';

// window.checkMobile = () => /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent);
// window.isMobile = window.checkMobile();

/** Create a client */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
            retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
        },
    },
});
