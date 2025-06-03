/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** hooks */
import { useRestart } from '@module-auth/hooks/useRestart';

/** components */
import StartLoading from '@module-base/components/StartLoading';

export default function StartScreen() {
    const hookRestart = useRestart();

    React.useEffect(() => {
        hookRestart.mutate({});
    }, []);

    return <StartLoading />;
}
