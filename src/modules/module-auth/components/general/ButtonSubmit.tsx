/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
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
            className={classnames('rounded-lg bg-red-500', 'max-sm:!w-full', 'sm:!w-1/3')}
        >
            <FormattedMessage id={AuthLanguage.component.button[type]} />
        </Button>
    );
}
