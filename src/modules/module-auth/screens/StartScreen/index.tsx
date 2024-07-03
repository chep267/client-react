/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart.ts';

/** components */
const StartLoading = React.lazy(() => import('@module-base/components/StartLoading'));

export default function StartScreen() {
    const RESTART = useRestart();

    React.useEffect(() => {
        RESTART.mutate({});
    }, []);

    return <StartLoading />;
}
