/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/// <reference types="vite/client" />

/** types */
import type { TypeLocale } from '@module-language/types';
import type { TypeTheme } from '@module-theme/types';

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
}

interface ImportMetaEnv {
    readonly VITE_APP_MODE: 'dev' | 'prod';
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_API_HOST: string;
    readonly VITE_APP_API_TYPE: 'firebase' | 'express';
    readonly VITE_APP_HOST: string;
    readonly VITE_APP_PORT: string;
    readonly VITE_APP_LOCALE: TypeLocale;
    readonly VITE_APP_THEME: TypeTheme;
    readonly VITE_APP_HAS_GZIP: 'true' | 'false';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
