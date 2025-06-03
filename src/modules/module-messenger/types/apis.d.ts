/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Unsubscribe } from 'firebase/firestore';
import type { TypePayloadApi, TypeItemIds, TypeItems } from '@module-base/types';
import type { TypeDocumentThreadData, TypeDocumentMessageData } from '@module-messenger/types';

export interface MessengerApiProps {
    /** thread */
    GetListThread: {
        Payload: TypePayloadApi<{
            uid: string;
            fnCallback(data: { itemIds: TypeItemIds; items: TypeItems<TypeDocumentThreadData> }): void;
        }>;
        Response?: { unsubscribe: Unsubscribe };
    };
    CreateThread: {
        Payload: TypePayloadApi<{
            uid: string;
            tid: string;
            data: TypeDocumentThreadData;
        }>;
        Response?: void;
    };
    MoveThread: {
        Payload: TypePayloadApi<{
            uid: string;
            tid: string;
        }>;
        Response?: void;
    };

    /** message */
    GetListMessage: {
        Payload: TypePayloadApi<{
            uid: string;
            tid: string;
            fnCallback(data: { itemIds: TypeItemIds; items: TypeItems<TypeDocumentMessageData> }): void;
        }>;
        Response?: { unsubscribe: Unsubscribe };
    };
    CreateMessage: {
        Payload: TypePayloadApi<{
            uid: string;
            tid: string;
            mid: string;
            data: TypeDocumentMessageData;
        }>;
        Response: { message: TypeDocumentMessageData };
    };
    SendFile: {
        Payload: TypePayloadApi<{
            tid: string;
            mid: string;
            fid: string;
            file: TypeDocumentMessageData['files'][string];
        }>;
        Response?: { fid: string; url: string };
    };
}
