/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

/** components */
import UserName from '@module-user/components/UserName';

/** constants */
import { ChatBotGPT } from '@module-messenger/constants';

/** utils */
import { validateId } from '@module-base/utils/validateId';

/** types */
import type { TypographyProps } from '@mui/material';
import type { TypeUser } from '@module-user/types';

type ThreadNameProps = TypographyProps & { tid?: TypeUser['uid']; name?: TypeUser['displayName'] };

export default function ThreadName(props: ThreadNameProps) {
    const { tid, name, ...otherProps } = props;

    if (tid === ChatBotGPT.MESSENGER_CHAT_BOT_AI_ID) {
        return <Typography {...otherProps}>{ChatBotGPT.MESSENGER_CHAT_BOT_AI_NAME}</Typography>;
    }

    if (!name && !tid) {
        return (
            <Typography {...otherProps}>
                <Skeleton width={100} />
            </Typography>
        );
    }

    const uid = validateId(`${tid}`, 'uid');
    return <UserName uid={uid} name={name} {...otherProps} />;
}
