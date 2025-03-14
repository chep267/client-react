/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { Avatar, Skeleton } from '@mui/material';

/** hooks */
import { useUser } from '@module-user/hooks/useUser';

/** types */
import type { UserAvatarProps } from '@module-user/types';

function UserAvatarGet(props: UserAvatarProps) {
    const { uid, alt, ...otherProps } = props;
    const user = useUser({ uid });
    const src = user?.data?.photoURL || undefined;

    if (!user) {
        return <Skeleton variant="circular" className={otherProps.className} />;
    }
    return <Avatar alt={alt || user?.data?.displayName || ''} src={src} {...otherProps} />;
}

export default function UserAvatar(props: UserAvatarProps) {
    const { uid, src, ...otherProps } = props;

    if (src) {
        return <Avatar src={src} {...otherProps} />;
    }
    return <UserAvatarGet uid={uid} {...otherProps} />;
}
