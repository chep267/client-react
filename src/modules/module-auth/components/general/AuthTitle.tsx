/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

export default function AuthTitle(props: App.ModuleAuth.Component.AuthTitleProps) {
    const { className, name = 'signin' } = props;

    return (
        <Typography className={clsx('z-1 text-4xl', className)}>
            <FormattedMessage id={AuthLanguage.component.title[name]} />
        </Typography>
    );
}
