/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { useParams } from 'react-router-dom';

/** components */
import ThreadName from '@module-messenger/components/ThreadName';

export default function ConversationName() {
    const { tid = '' } = useParams();

    return <ThreadName tid={tid} variant="h5" />;
}
