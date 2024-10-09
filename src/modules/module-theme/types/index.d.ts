/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export * from './data.d';

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
