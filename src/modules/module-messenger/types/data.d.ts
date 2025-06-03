/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types';

export type TypeDocumentThreadData = {
    tid: string;
    name?: string;
    type?: 'thread' | 'group';
    members?: TypeItemIds;
    lastMessage?: TypeDocumentMessageData;
};

export type TypeDocumentMessageData = {
    uid: string;
    tid: string;
    mid: string;
    text: string;
    fileIds: TypeItemIds;
    files: TypeItems<{
        fid: string;
        fileData?: File | null;
        url: string;
        name: File['name'];
        size: File['size'];
        type: File['type'];
    }>;
    createdTime: number;
    updatedTime: number;
    type: 'text' | 'emoji';
};
