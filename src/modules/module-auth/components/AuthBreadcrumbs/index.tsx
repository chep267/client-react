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
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** types */
import type { TypeAuthBreadcrumbsItem } from '@module-auth/types';

export default function AuthBreadcrumbs() {
    const { pathname } = useLocation();

    const breadcrumbs: TypeAuthBreadcrumbsItem[] = React.useMemo(() => {
        return [
            {
                title: AuthLanguage.component.title.signin,
                path: AuthRouterPath.signin,
                hidden: pathname.startsWith(AuthRouterPath.signin),
            },
            {
                title: AuthLanguage.component.title.register,
                path: AuthRouterPath.register,
                hidden: pathname.startsWith(AuthRouterPath.register),
            },
            {
                title: AuthLanguage.component.title.recover,
                path: AuthRouterPath.recover,
                hidden: pathname.startsWith(AuthRouterPath.recover),
            },
        ];
    }, [pathname]);

    return (
        <Breadcrumbs aria-label="breadcrumb" color="primary">
            {breadcrumbs.map((item) =>
                item.hidden ? undefined : (
                    <Link key={item.path} component={RouterLink} to={item.path} replace underline="hover" fontSize="larger">
                        <FormattedMessage id={item.title} />
                    </Link>
                )
            )}
        </Breadcrumbs>
    );
}
