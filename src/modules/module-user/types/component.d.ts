/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { AvatarProps } from '@mui/material/Avatar';
import type { TypographyProps } from '@mui/material/Typography';
import type { TypeUser } from '@module-user/types/data.d';

export interface UserAvatarProps extends AvatarProps {
    uid?: TypeUser['uid'];
}

export interface UserNameProps extends TypographyProps {
    uid?: TypeUser['uid'];
    name?: TypeUser['displayName'];
}
