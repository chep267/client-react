/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

/** hooks */
import { useUser } from '@module-user/hooks/useUser';

function UserAvatarGet(props: App.ModuleUser.Component.UserAvatarProps) {
    const { uid, alt, ...otherProps } = props;
    const user = useUser({ uid });
    const src = user?.data?.photoURL || undefined;

    if (!user) {
        return <Skeleton variant="circular" className={otherProps.className} />;
    }
    return <Avatar alt={alt || user?.data?.displayName || ''} src={src} {...otherProps} />;
}

export default function UserAvatar(props: App.ModuleUser.Component.UserAvatarProps) {
    const { uid, src, ...otherProps } = props;

    if (src) {
        return <Avatar src={src} {...otherProps} />;
    }
    return <UserAvatarGet uid={uid} {...otherProps} />;
}
