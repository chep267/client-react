/**
 *
 * @author dongntd267@gmail.com
 *
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_MODE: 'dev' | 'prod';
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_API_HOST: string;
    readonly VITE_APP_CLIENT_HOST: string;
    readonly VITE_APP_CLIENT_PORT: string;
    readonly VITE_APP_CLIENT_LOCALE: App.ModuleLanguage.Data.Locale;
    readonly VITE_APP_CLIENT_THEME: App.ModuleTheme.Data.Theme;
}

declare module '*.svg' {
    const ReactComponent: any;
    export const ReactComponent;
}

declare module '*.png' {
    const ReactComponent: any;
    export const ReactComponent;
}

declare global {
    interface Window {
        checkMobile(): boolean;
        isMobile: boolean;
    }
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
