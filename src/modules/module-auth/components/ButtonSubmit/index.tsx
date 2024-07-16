/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import { LoadingButton } from '@mui/lab';

/** types */
import type { AuthButtonSubmitProps } from '@module-auth/types';
import classnames from 'classnames';

export default function ButtonSubmit(props: AuthButtonSubmitProps) {
    const { loading, type } = props;

    return (
        <LoadingButton
            type="submit"
            loading={loading}
            size="large"
            variant="contained"
            className={classnames('rounded-lg w-1/3', {
                'max-sm:w-full': true, // mobile
            })}>
            <FormattedMessage id={`module.auth.button.${type}`} />
        </LoadingButton>
    );
}
