/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { AvatarProps } from '@mui/material/Avatar';
import type { TypographyProps } from '@mui/material/Typography';
import type { TypeUser } from './data.d';

export interface TypeUserAvatarProps extends AvatarProps {
    uid?: TypeUser['uid'];
}

export interface TypeUserNameProps extends TypographyProps {
    uid?: TypeUser['uid'];
    name?: TypeUser['displayName'];
}
