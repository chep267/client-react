/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { AvatarProps } from '@mui/material/Avatar';
import type { TypographyProps } from '@mui/material/Typography';
import type { TypeUser } from '@module-user/types/data.d';

export type UserAvatarProps = AvatarProps & { uid?: TypeUser['uid'] };

export type UserNameProps = TypographyProps & { uid?: TypeUser['uid']; name?: TypeUser['displayName'] };
