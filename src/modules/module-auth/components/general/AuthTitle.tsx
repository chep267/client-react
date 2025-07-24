/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

const AuthTitle = React.memo<App.ModuleAuth.Component.AuthTitleProps>(function AuthTitle(props) {
    const { className, name = 'signin' } = props;

    return (
        <Typography className={clsx('text-tw-primary z-1 text-4xl', className)}>
            <FormattedMessage id={AuthLanguage.component.title[name]} />
        </Typography>
    );
});

export default AuthTitle;
