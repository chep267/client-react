/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import { FormattedMessage } from 'react-intl';
import { LoadingButton } from '@mui/lab';

type ButtonSubmitProps = {
    loading?: boolean;
    type: 'signin' | 'register' | 'recover';
};

export default function ButtonSubmit(props: ButtonSubmitProps) {
    const { loading, type } = props;

    return (
        <LoadingButton
            type="submit"
            loading={loading}
            size="large"
            variant="contained"
            className="rounded-lg w-1/3"
            fullWidth={false}>
            <FormattedMessage id={`module.auth.button.${type}`} />
        </LoadingButton>
    );
}
