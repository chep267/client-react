/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { TypeItems } from '@module-base/types';
import type { TypeDocumentMessageData } from '@module-messenger/types/data';

export declare type ThreadSearchContextProps = {
    data: {
        isFocusSearch: boolean;
        isSearching: boolean;
        searchKey: string;
    };
    method: {
        setFocusSearch: Dispatch<SetStateAction<boolean>>;
        setSearching: Dispatch<SetStateAction<boolean>>;
        setSearchKey: Dispatch<SetStateAction<string>>;
    };
};

export declare type ThreadSearchProviderProps = PropsWithChildren;

export declare type MessengerContextProps = {
    ui: {
        openThreadInfo: boolean;
        drafts: TypeItems<TypeDocumentMessageData>;
    };
    method: {
        setOpenThreadInfo: Dispatch<SetStateAction<boolean>>;
        setText(
            payload: Pick<TypeDocumentMessageData, 'tid' | 'text'> & Partial<Pick<TypeDocumentMessageData, 'type'>>
        ): void;
        setFiles(payload: Pick<TypeDocumentMessageData, 'tid' | 'fileIds' | 'files'>): void;
        removeFiles(payload: Pick<TypeDocumentMessageData, 'tid' | 'fileIds'>): void;
        setEmptyThread(tid: string): void;
    };
};
