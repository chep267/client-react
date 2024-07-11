/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import List from '@mui/material/List';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PaletteIcon from '@mui/icons-material/Palette';
import TranslateIcon from '@mui/icons-material/Translate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import EventNoteIcon from '@mui/icons-material/EventNote';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';
import { localeObject } from '@module-language/constants/localeObject.ts';
import { themeObject } from '@module-theme/constants/themeObject.ts';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay.ts';

/** hooks */
import { useTheme } from '@module-theme/hooks/useTheme.ts';
import { useLanguage } from '@module-language/hooks/useLanguage.ts';
import { useSignOut } from '@module-auth/hooks/useSignOut.ts';
import { useCalendar } from '@module-calendar/hooks/useCalendar.ts';

/** components */
import NestedItem from '@module-base/components/NestedItem';

/** types */
import type { NestedItemProps } from '@module-base/types';

type Props = {
    closeMenu(): void;
};

export default function MenuSetting(props: Props) {
    const { closeMenu } = props;

    const THEME = useTheme();
    const LANGUAGE = useLanguage();
    const CALENDAR = useCalendar();
    const SIGN_OUT = useSignOut();

    const calendarSubMenu = React.useRef([
        {
            id: 'module.calendar.setting.display.default',
            title: <FormattedMessage id="module.calendar.setting.display.default" />,
            icon: <EventNoteIcon color="primary" />,
            onClick: () => CALENDAR.method.setDisplay(CalendarDisplay.sunday),
        },
        {
            id: 'module.calendar.setting.display.mon',
            title: <FormattedMessage id="module.calendar.setting.display.mon" />,
            icon: <TodayIcon color="primary" />,
            onClick: () => CALENDAR.method.setDisplay(CalendarDisplay.monday),
        },
        {
            id: 'module.calendar.setting.display.week',
            title: <FormattedMessage id="module.calendar.setting.display.week" />,
            icon: <EventIcon color="primary" />,
            onClick: () => CALENDAR.method.setDisplay(CalendarDisplay.weekend),
        },
        {
            id: 'module.calendar.setting.display.only.month',
            title: <FormattedMessage id="module.calendar.setting.display.only.month" />,
            icon: <DateRangeIcon color="primary" />,
            onClick: () => CALENDAR.method.setIsOnlyMonth(true),
        },
        {
            id: 'module.calendar.setting.display.both.month',
            title: <FormattedMessage id="module.calendar.setting.display.both.month" />,
            icon: <DateRangeIcon color="primary" />,
            onClick: () => CALENDAR.method.setIsOnlyMonth(false),
        },
    ]).current;

    const menuBase = React.useRef<NestedItemProps[]>([
        {
            id: 'Theme',
            title: <FormattedMessage id="module.theme.text.title" />,
            icon: <PaletteIcon color="primary" />,
            divide: 'top-bottom',
            subMenu: [
                {
                    id: 'Theme-Dark',
                    title: <FormattedMessage id="module.theme.text.dark" />,
                    icon: <DarkModeIcon color="disabled" />,
                    onClick: () => THEME.method.setTheme(themeObject.dark),
                },
                {
                    id: 'Theme-Light',
                    title: <FormattedMessage id="module.theme.text.light" />,
                    icon: <LightModeIcon color="warning" />,
                    onClick: () => THEME.method.setTheme(themeObject.light),
                },
            ],
        },
        {
            id: 'Language',
            title: <FormattedMessage id="module.language.text.title" />,
            icon: <TranslateIcon color="primary" />,
            divide: 'bottom',
            subMenu: [
                {
                    id: 'Language-Vi',
                    title: <FormattedMessage id="module.language.text.vi" />,
                    icon: (
                        <span style={{ transform: 'scale(1.2)' }} className="w-screen">
                            🇻🇳
                        </span>
                    ),
                    onClick: () => LANGUAGE.method.setLanguage(localeObject.vi),
                },
                {
                    id: 'Language-En',
                    title: <FormattedMessage id="module.language.text.en" />,
                    icon: <span style={{ transform: 'scale(1.2)' }}>🇬🇧</span>,
                    onClick: () => LANGUAGE.method.setLanguage(localeObject.en),
                },
            ],
        },
    ]).current;

    const menuAuth = React.useMemo<NestedItemProps[]>(() => {
        if (!SIGN_OUT.isAuthentication) {
            return AppDefaultValue.emptyArray;
        }

        const menuOnlyMonth = calendarSubMenu[CALENDAR.data.isOnlyMonth ? 4 : 3];
        const subMenu =
            CALENDAR.data.display === CalendarDisplay.sunday
                ? [calendarSubMenu[1], calendarSubMenu[2], menuOnlyMonth]
                : CALENDAR.data.display === CalendarDisplay.monday
                  ? [calendarSubMenu[0], calendarSubMenu[2], menuOnlyMonth]
                  : [calendarSubMenu[0], calendarSubMenu[1], menuOnlyMonth];
        return [
            {
                id: 'Calendar',
                title: <FormattedMessage id="module.calendar.text.title" />,
                icon: <CalendarMonthIcon color="primary" />,
                divide: 'bottom',
                subMenu,
            },
            {
                id: 'sign-out',
                title: <FormattedMessage id="module.auth.form.title.signout" />,
                icon: <LogoutIcon color="primary" />,
                divide: 'bottom',
                loading: SIGN_OUT.isPending,
                onClick: () => SIGN_OUT.mutate({}, { onSuccess: closeMenu }),
            },
        ];
    }, [SIGN_OUT.isPending, SIGN_OUT.isAuthentication, CALENDAR.data.display, CALENDAR.data.isOnlyMonth]);

    const renderMenuBase = React.useMemo(() => {
        return menuBase.map((item) => <NestedItem key={item?.id} {...item} />);
    }, []);

    const renderMenuAuth = React.useMemo(() => {
        return menuAuth.map((item) => <NestedItem key={item?.id} {...item} />);
    }, [menuAuth]);

    return (
        <List component="nav">
            {renderMenuBase}
            {renderMenuAuth}
        </List>
    );
}
