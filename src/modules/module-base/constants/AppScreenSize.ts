/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const AppScreenSize = {
    HeaderHeight: 64,
    AppBarMiniHeight: 48,
    AppBarCollapseWidth: 56,
    AppBarExpandWidth: 267,
    AppbarHiddenBreakpoint: 600,
    AppbarCollapseBreakpoint: 1030, // 900,
    CalendarSelectHeight: 100,

    Messenger: {
        left: {
            titleHeight: 100,
            minWidth: 80,
            mediumWidth: 280,
            maxWidth: 360,
        },
        right: {
            minWidth: 80,
            mediumWidth: 280,
            maxWidth: 360,
        },
        center: {
            titleHeight: 100,
        },
    },
} as const;
