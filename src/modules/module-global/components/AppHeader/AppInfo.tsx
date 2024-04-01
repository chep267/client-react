/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** components */
import IconBase from '@module-base/components/IconBase';

/** constants */
import { ScreenPath } from '@module-global/constants/ScreenPath.ts';
import { APP_NAME } from '@root/constants';

export default function AppInfo() {
    return (
        <Box className="flex items-center gap-2" component={Link} to={ScreenPath.HOME}>
            <IconBase name="appLogo" />
            <Typography variant="h6" fontWeight={600}>
                {APP_NAME}
            </Typography>
        </Box>
    );
}
