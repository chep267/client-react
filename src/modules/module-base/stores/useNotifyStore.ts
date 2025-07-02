/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';

const defaultNotifyStoreData: Readonly<App.ModuleBase.Store.NotifyStore['data']> = {
    open: false,
    message: '',
    messageIntl: '',
    color: undefined,
    duration: undefined,
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
};

export const useNotifyStore = create<App.ModuleBase.Store.NotifyStore>((set) => ({
    data: structuredClone(defaultNotifyStoreData),
    action: {
        closeNotify: () => set(() => ({ data: structuredClone(defaultNotifyStoreData) })),
        openNotify: (payload) => set((store) => ({ data: { ...store.data, ...payload } })),
    },
}));
