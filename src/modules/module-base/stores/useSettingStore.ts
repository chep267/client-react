/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { create } from 'zustand';
import { produce } from 'immer';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';

/** utils */
import { getDeviceLanguage } from '@module-base/utils/getDeviceLanguage';
import { getDeviceTheme } from '@module-base/utils/getDeviceTheme';
import { getSiderState } from '@module-base/utils/getSiderState';

const defaultNotifyStoreData: Readonly<App.ModuleBase.Store.SettingStore['data']> = {
    locale: getDeviceLanguage(),
    theme: getDeviceTheme(),
    sider: getSiderState(),
};

export const useSettingStore = create<App.ModuleBase.Store.SettingStore>((set) => ({
    data: structuredClone(defaultNotifyStoreData),
    action: {
        changeLocale: (locale) => {
            Cookies.set(AppKey.locale, locale);
            set(
                produce<App.ModuleBase.Store.SettingStore>(({ data }) => {
                    data.locale = locale;
                })
            );
        },
        changeTheme: (theme) => {
            Cookies.set(AppKey.theme, theme);
            set(
                produce<App.ModuleBase.Store.SettingStore>(({ data }) => {
                    data.theme = theme;
                })
            );
        },
        changeSider: (sider) => {
            set(
                produce<App.ModuleBase.Store.SettingStore>(({ data }) => {
                    data.sider = sider;
                })
            );
        },
    },
}));
