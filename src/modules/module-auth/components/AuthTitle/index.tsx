/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

export default function AuthTitle() {
    const { pathname } = useLocation();

    const mode = React.useMemo(() => {
        if (pathname.startsWith(AuthRouterPath.signIn)) {
            return 'signIn';
        }
        if (pathname.startsWith(AuthRouterPath.register)) {
            return 'register';
        }
        if (pathname.startsWith(AuthRouterPath.recover)) {
            return 'recover';
        }
        return 'signIn';
    }, [pathname]);

    return (
        <Typography color="primary.main" className="text-3xl md:text-5xl">
            {mode && <FormattedMessage id={AuthLanguage.component.title[mode]} />}
        </Typography>
    );
}
