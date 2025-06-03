/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** constants */
import { AppEnv } from '@module-base/constants/AppEnv';
import { AppRouterPath } from '@module-base/constants/AppRouterPath';

/** components */
import IconBase from '@module-base/components/IconBase';

export default function AppInfo() {
    return (
        <Box className="flex items-center gap-2" component={Link} to={AppRouterPath.home}>
            <IconBase name="appLogo" />
            <Typography variant="h6" fontWeight={600}>
                {AppEnv.appName}
            </Typography>
        </Box>
    );
}
