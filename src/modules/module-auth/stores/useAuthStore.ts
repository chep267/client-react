/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

export const useAuthStore = create<App.ModuleAuth.Store.AuthStore>((set) => ({
    data: {
        user: null,
        prePath: '/',
    },
    action: {
        setData: (updateData = AppDefaultValue.emptyObject) => {
            set(
                produce<App.ModuleAuth.Store.AuthStore>(({ data }) => {
                    Object.assign(data, updateData);
                })
            );
        },
    },
}));
