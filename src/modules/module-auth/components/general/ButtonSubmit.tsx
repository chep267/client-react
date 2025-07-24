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

const ButtonSubmit = React.memo(function ButtonSubmit(props: App.ModuleAuth.Component.AuthButtonSubmitProps) {
    const { loading, name = 'signin' } = props;

    return (
        <Button
            type="submit"
            loading={loading}
            size="large"
            variant="contained"
            className={clsx('bg-tw-primary font-bold tracking-normal capitalize', 'w-full', 'xs:w-1/3')}
        >
            <FormattedMessage id={AuthLanguage.component.button[name]} />
        </Button>
    );
});

export default ButtonSubmit;
