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
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath.ts';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

export default function AuthTitle() {
    const { pathname } = useLocation();

    const mode = React.useMemo(() => {
        if (pathname.startsWith(AuthRouterPath.signin)) {
            return 'signin';
        }
        if (pathname.startsWith(AuthRouterPath.register)) {
            return 'register';
        }
        if (pathname.startsWith(AuthRouterPath.recover)) {
            return 'recover';
        }
        return '';
    }, [pathname]);

    return (
        <Typography variant="h3" color="primary.main">
            {mode && <FormattedMessage id={AuthLanguage.component.title[mode]} />}
        </Typography>
    );
}
