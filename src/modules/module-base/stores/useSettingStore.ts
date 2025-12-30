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

const defaultNotifyStoreData: Readonly<App.ModuleBase.Store.SettingStore['data']['notify']> = {
    open: false,
    message: '',
    messageIntl: '',
    color: undefined,
    duration: undefined,
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
};

const defaultSettingStore: Readonly<App.ModuleBase.Store.SettingStore['data']> = {
    locale: getDeviceLanguage(),
    theme: getDeviceTheme(),
    sider: getSiderState(),
    notify: defaultNotifyStoreData,
};

export const useSettingStore = create<App.ModuleBase.Store.SettingStore>((set) => ({
    data: structuredClone(defaultSettingStore),
    action: {
        changeLocale: (locale = defaultSettingStore.locale) => {
            Cookies.set(AppKey.locale, locale);
            set(
                produce<App.ModuleBase.Store.SettingStore>((store) => {
                    store.data.locale = locale;
                })
            );
        },
        changeTheme: (theme = defaultSettingStore.theme) => {
            Cookies.set(AppKey.theme, theme);
            set(
                produce<App.ModuleBase.Store.SettingStore>((store) => {
                    store.data.theme = theme;
                })
            );
        },
        changeSider: (sider = defaultSettingStore.sider) => {
            set(
                produce<App.ModuleBase.Store.SettingStore>((store) => {
                    store.data.sider = sider;
                })
            );
        },
        changeNotify: (notifyData = structuredClone(defaultNotifyStoreData)) => {
            set(
                produce<App.ModuleBase.Store.SettingStore>((store) => {
                    store.data.notify = { ...store.data.notify, ...notifyData };
                })
            );
        },
    },
}));
