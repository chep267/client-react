/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

const ButtonSubmit = React.memo<App.ModuleAuth.Component.AuthButtonSubmitProps>(function ButtonSubmit(props) {
    const { name = 'signin', type = 'submit', size = 'large', variant = 'contained', className, ...btnProps } = props;

    return (
        <Button
            type={type}
            size={size}
            variant={variant}
            className={clsx('bg-tw-primary font-bold tracking-normal capitalize', 'w-full', 'xs:w-1/3', className)}
            {...btnProps}
        >
            <FormattedMessage id={AuthLanguage.component.button[name]} />
        </Button>
    );
});

export default ButtonSubmit;
