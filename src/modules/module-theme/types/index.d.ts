/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from './data.d';

declare global {
    namespace App.ModuleTheme {
        namespace Data {
            type Theme = TypeData.TypeTheme;
            type ThemeData = TypeData.TypeThemeData;
        }
    }
}

declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';
declare module '*.otf';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        mobile: true;
        tablet: true;
        laptop: true;
        desktop: true;
    }
}
