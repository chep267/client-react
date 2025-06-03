/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Favorite as FavoriteIcon } from '@mui/icons-material';

/** type */
import type { SvgIconProps } from '@mui/material';

export default function EmojiMessage(props: SvgIconProps) {
    const { color = 'primary', fontSize = 'large', ...other } = props;
    return <FavoriteIcon color={color} fontSize={fontSize} {...other} />;
}
