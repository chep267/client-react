/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { AvatarProps, TypographyProps } from '@mui/material';
import type { TypeUser } from '@module-user/models/data.d.ts';

export type UserAvatarProps = AvatarProps & { uid?: TypeUser['uid'] };

export type UserNameProps = TypographyProps & { uid?: TypeUser['uid']; name?: TypeUser['displayName'] };
