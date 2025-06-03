/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

/** hooks */
import { useUser } from '@module-user/hooks/useUser';

function UserNameGet(props: Omit<App.ModuleUser.Component.UserNameProps, 'name'>) {
    const { uid, ...textProps } = props;
    const user = useUser({ uid });

    return <Typography {...textProps}>{user?.data?.displayName || <Skeleton width={100} />}</Typography>;
}

export default function UserName(props: App.ModuleUser.Component.UserNameProps) {
    const { uid, name, ...textProps } = props;

    if (name) {
        return <Typography {...textProps}>{name}</Typography>;
    }
    return <UserNameGet uid={uid} {...textProps} />;
}
