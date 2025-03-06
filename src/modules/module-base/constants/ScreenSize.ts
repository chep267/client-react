/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export const ScreenSize = {
    HeaderHeight: 64,
    AppBarMiniHeight: 48,
    AppBarCollapseWidth: 56,
    AppBarExpandWidth: 267,
    AppbarHiddenBreakpoint: 600,
    AppbarCollapseBreakpoint: 1030, // 900,
    CalendarSelectHeight: 100,
    SmScreenWidth: 600,

    Messenger: {
        left: {
            titleHeight: 70,
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
