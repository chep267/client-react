/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** components */
import VirtualList from '@module-base/components/VirtualList';
import ImagePreview from '@module-messenger/components/ConversationFooter/ListFiles/ImagePreview';

/** styles */

export default function ListFiles() {
    const { tid = '' } = useParams();
    const { ui, method } = useMessenger();

    const draft = ui.drafts[tid];

    const onRemoveFile = React.useCallback(
        (fid: string) => {
            method.removeFiles({ tid, fileIds: [fid] });
        },
        [tid]
    );

    if (!draft?.fileIds?.length) {
        return null;
    }

    const itemContent = (_index: number, fid: string) => {
        const item = draft?.files?.[fid];
        if (!item) {
            return null;
        }
        return <ImagePreview key={fid} file={draft?.files?.[fid]} fid={fid} onRemoveFile={onRemoveFile} />;
    };

    return (
        <VirtualList
            className="min-h-[120px] overflow-y-hidden"
            horizontalDirection
            data={draft?.fileIds}
            itemProps={{ className: 'p-0 m-0 w-max ml-1' }}
            itemContent={itemContent}
        />
    );
}
