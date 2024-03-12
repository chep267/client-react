/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import { useLocation } from 'react-router-dom';

/** lib components */
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';

export default function AuthTitle() {
    const location = useLocation();
    const type = location.pathname.split('/')[1] || 'signin';

    return (
        <Typography variant="h3" color="primary.main">
            <FormattedMessage id={`module.auth.form.title.${type}`} />
        </Typography>
    );
}
