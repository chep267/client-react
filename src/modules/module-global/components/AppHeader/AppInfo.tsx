/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** constants */
import { GlobalRouterPath } from '@module-global/constants/GlobalRouterPath.ts';
import { AppName } from '@module-global/constants/AppName.ts';

/** components */
import IconBase from '@module-base/components/IconBase';

export default function AppInfo() {
    return (
        <Box className="flex items-center gap-2" component={Link} to={GlobalRouterPath.home}>
            <IconBase name="appLogo" />
            <Typography variant="h6" fontWeight={600}>
                {AppName}
            </Typography>
        </Box>
    );
}
