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
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

export default function AuthTitle() {
    const { pathname } = useLocation();

    const mode = React.useMemo(() => {
        if (pathname.startsWith(AuthScreenPath.signin)) {
            return 'signin';
        }
        if (pathname.startsWith(AuthScreenPath.register)) {
            return 'register';
        }
        if (pathname.startsWith(AuthScreenPath.recover)) {
            return 'recover';
        }
        return '';
    }, [pathname]);

    return (
        <Typography variant="h3" color="primary.main">
            {mode && <FormattedMessage id={`module.auth.form.title.${mode}`} />}
        </Typography>
    );
}
