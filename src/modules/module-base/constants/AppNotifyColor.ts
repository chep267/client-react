/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const AppNotifyColor: Record<string, App.ModuleBase.Store.SettingStore['data']['notify']['color']> = {
    default: undefined,
    error: 'error',
    warning: 'warning',
    success: 'success',
} as const;
