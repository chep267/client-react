/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** lib components */
import { Avatar, Skeleton } from '@mui/material';

/** components */
import UserAvatar from '@module-user/components/UserAvatar';

/** utils */
import { validateId } from '@module-base/utils/validateId';

/** types */
import type { AvatarProps } from '@mui/material';
import type { TypeUser } from '@module-user/types';

type ThreadAvatarProps = AvatarProps & { tid?: TypeUser['uid'] };

export default function ThreadAvatar(props: ThreadAvatarProps) {
    const { tid, src, ...otherProps } = props;

    if (!src && !tid) {
        return (
            <Skeleton variant="circular">
                <Avatar className={otherProps.className} />
            </Skeleton>
        );
    }

    const uid = validateId(`${tid}`, 'uid');
    return <UserAvatar uid={uid} src={src} {...otherProps} />;
}
