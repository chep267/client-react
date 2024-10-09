/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart';

/** components */
const StartLoading = React.lazy(() => import('@module-base/components/StartLoading'));

export default function StartScreen() {
    const hookRestart = useRestart();

    React.useEffect(() => {
        hookRestart.mutate({});
    }, []);

    return <StartLoading />;
}
