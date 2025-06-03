/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** types */
import type { AuthButtonSubmitProps } from '@module-auth/types';

export default function ButtonSubmit(props: AuthButtonSubmitProps) {
    const { loading, type } = props;

    return (
        <Button
            type="submit"
            loading={loading}
            size="large"
            variant="contained"
            className={clsx('bg-tw-primary font-bold tracking-normal capitalize', 'w-full', 'xs:w-1/3')}
        >
            <FormattedMessage id={AuthLanguage.component.button[type]} />
        </Button>
    );
}
