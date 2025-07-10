/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Cookies from 'js-cookie';

/** AppKey */
import { AppKey } from '@module-base/constants/AppKey';

/** hooks */
import { useRestart } from '@module-auth/hooks/useAuth';

/** components */
import StartLoading from '@module-base/components/StartLoading';

export default function StartScreen() {
    const uid = Cookies.get(AppKey.uid) || '';
    const hookRestart = useRestart();

    React.useEffect(() => {
        if (uid) {
            hookRestart.mutate({ uid });
        }
    }, [uid]);

    return <StartLoading />;
}
