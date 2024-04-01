/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthScreenPath } from '@module-auth/constants/AuthScreenPath.ts';

/** types */
export type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
};

export default function AuthBreadcrumbs() {
    const location = useLocation();

    const breadcrumbs: TypeAuthBreadcrumbsItem[] = [
        location.pathname.startsWith(AuthScreenPath.signin)
            ? {
                  title: 'module.auth.form.title.register',
                  path: AuthScreenPath.register,
              }
            : {
                  title: 'module.auth.form.title.signin',
                  path: AuthScreenPath.signin,
              },

        {
            title: 'module.auth.form.title.recover',
            path: AuthScreenPath.recover,
        },
    ];

    return (
        <Breadcrumbs aria-label="breadcrumb" color="primary">
            {breadcrumbs.map((item) => (
                <Link
                    key={item.path}
                    component={RouterLink as any}
                    to={item.path}
                    replace
                    underline="hover"
                    fontSize="larger">
                    <FormattedMessage id={item.title} />
                </Link>
            ))}
        </Breadcrumbs>
    );
}
