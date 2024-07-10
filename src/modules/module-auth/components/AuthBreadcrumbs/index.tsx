/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

/** types */
import type { TypeAuthBreadcrumbsItem } from '@module-auth/types';

export default function AuthBreadcrumbs() {
    const { pathname } = useLocation();

    const breadcrumbs: TypeAuthBreadcrumbsItem[] = React.useMemo(() => {
        return [
            {
                title: 'module.auth.form.title.signin',
                path: AuthScreenPath.signin,
                hidden: pathname.startsWith(AuthScreenPath.signin),
            },
            {
                title: 'module.auth.form.title.register',
                path: AuthScreenPath.register,
                hidden: pathname.startsWith(AuthScreenPath.register),
            },
            {
                title: 'module.auth.form.title.recover',
                path: AuthScreenPath.recover,
                hidden: pathname.startsWith(AuthScreenPath.recover),
            },
        ];
    }, [pathname]);

    return (
        <Breadcrumbs aria-label="breadcrumb" color="primary">
            {breadcrumbs.map((item) =>
                item.hidden ? undefined : (
                    <Link
                        key={item.path}
                        component={RouterLink as any}
                        to={item.path}
                        replace
                        underline="hover"
                        fontSize="larger">
                        <FormattedMessage id={item.title} />
                    </Link>
                )
            )}
        </Breadcrumbs>
    );
}
