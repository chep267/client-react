/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import { LoadingButton } from '@mui/lab';

/** types */
import type { AuthButtonSubmitProps } from '@module-auth/models';

export default function ButtonSubmit(props: AuthButtonSubmitProps) {
    const { loading, type } = props;

    return (
        <LoadingButton type="submit" loading={loading} size="large" variant="contained" className="rounded-lg w-1/3">
            <FormattedMessage id={`module.auth.button.${type}`} />
        </LoadingButton>
    );
}
