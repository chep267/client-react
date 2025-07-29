/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

const AuthBreadcrumbs = React.memo<App.ModuleAuth.Component.AuthBreadcrumbsProps>(function AuthBreadcrumbs(props) {
    const { name = 'signin' } = props;

    const breadcrumbs: App.ModuleAuth.Component.AuthBreadcrumbsItem[] = [
        {
            title: AuthLanguage.component.title.signin,
            path: AuthRouterPath.signin,
            hidden: name === 'signin',
        },
        {
            title: AuthLanguage.component.title.register,
            path: AuthRouterPath.register,
            hidden: name === 'register',
        },
        {
            title: AuthLanguage.component.title.recover,
            path: AuthRouterPath.recover,
            hidden: name === 'recover',
        },
    ];

    return (
        <Breadcrumbs aria-label="breadcrumb" className="text-tw-primary w-full">
            {breadcrumbs.map((item) =>
                item.hidden ? undefined : (
                    <Link
                        key={item.path}
                        component={RouterLink}
                        to={item.path}
                        className="text-inherit"
                        replace
                        underline="hover"
                        fontSize="larger"
                    >
                        <FormattedMessage id={item.title} />
                    </Link>
                )
            )}
        </Breadcrumbs>
    );
});

export default AuthBreadcrumbs;
