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
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { localeObject } from '@module-language/constants/localeObject';
import { themeObject } from '@module-theme/constants/themeObject';
import { CalendarDisplay } from '@module-calendar/constants/CalendarDisplay';
import { ThemeLanguage } from '@module-theme/constants/ThemeLanguage';
import { LangLanguage } from '@module-language/constants/LangLanguage';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';
import { CalendarLanguage } from '@module-calendar/constants/CalendarLanguage';

/** hooks */
import { useTheme } from '@module-theme/hooks/useTheme';
import { useLanguage } from '@module-language/hooks/useLanguage';
import { useSignOut } from '@module-auth/hooks/useSignOut';
import { useCalendar } from '@module-calendar/hooks/useCalendar';

/** components */
import NestedItem from '@module-base/components/NestedItem';

/** types */
import type { NestedItemProps } from '@module-base/types';

type Props = {
    closeMenu(): void;
};

const MenuSetting = React.memo(function MenuSetting(props: Props) {
    const { closeMenu } = props;

    const hookTheme = useTheme();
    const hookLanguage = useLanguage();
    const hookCalendar = useCalendar();
    const hookSignOut = useSignOut();

    const { isOnlyMonth, display } = hookCalendar.data;

    const calendarSubMenu = React.useRef([
        {
            id: 'default',
            title: <FormattedMessage id={CalendarLanguage.component.label.display.default} />,
            icon: <EventNoteIcon color="primary" />,
            onClick: () => hookCalendar.method.setDisplay(CalendarDisplay.sunday),
        },
        {
            id: 'monday',
            title: <FormattedMessage id={CalendarLanguage.component.label.display.monday} />,
            icon: <TodayIcon color="primary" />,
            onClick: () => hookCalendar.method.setDisplay(CalendarDisplay.monday),
        },
        {
            id: 'weekend',
            title: <FormattedMessage id={CalendarLanguage.component.label.display.weekend} />,
            icon: <EventIcon color="primary" />,
            onClick: () => hookCalendar.method.setDisplay(CalendarDisplay.weekend),
        },
        {
            id: 'onlyMonth',
            title: <FormattedMessage id={CalendarLanguage.component.label.display.onlyMonth} />,
            icon: <DateRangeIcon color="primary" />,
            onClick: () => hookCalendar.method.setIsOnlyMonth(true),
        },
        {
            id: 'bothMonth',
            title: <FormattedMessage id={CalendarLanguage.component.label.display.bothMonth} />,
            icon: <DateRangeIcon color="primary" />,
            onClick: () => hookCalendar.method.setIsOnlyMonth(false),
        },
    ]).current;

    const menuBase = React.useRef<NestedItemProps[]>([
        {
            id: 'Theme',
            title: <FormattedMessage id={ThemeLanguage.component.label.router} />,
            icon: <PaletteIcon color="primary" />,
            divide: 'top-bottom',
            subMenu: [
                {
                    id: 'Theme-Dark',
                    title: <FormattedMessage id={ThemeLanguage.component.label.dark} />,
                    icon: <DarkModeIcon color="disabled" />,
                    onClick: () => hookTheme.method.setTheme(themeObject.dark),
                },
                {
                    id: 'Theme-Light',
                    title: <FormattedMessage id={ThemeLanguage.component.label.light} />,
                    icon: <LightModeIcon color="warning" />,
                    onClick: () => hookTheme.method.setTheme(themeObject.light),
                },
            ],
        },
        {
            id: 'Language',
            title: <FormattedMessage id={LangLanguage.component.label.router} />,
            icon: <TranslateIcon color="primary" />,
            divide: 'bottom',
            subMenu: [
                {
                    id: 'Language-Vi',
                    title: <FormattedMessage id={LangLanguage.component.label.vi} />,
                    icon: <span className="scale-125">🇻🇳</span>,
                    onClick: () => hookLanguage.method.setLanguage(localeObject.vi),
                },
                {
                    id: 'Language-En',
                    title: <FormattedMessage id={LangLanguage.component.label.en} />,
                    icon: <span className="scale-125">🇬🇧</span>,
                    onClick: () => hookLanguage.method.setLanguage(localeObject.en),
                },
            ],
        },
    ]).current;

    const menuAuth = React.useMemo<NestedItemProps[]>(() => {
        if (!hookSignOut.isAuthentication) {
            return AppDefaultValue.emptyArray;
        }

        const menuOnlyMonth = calendarSubMenu[isOnlyMonth ? 4 : 3];
        const subMenu =
            display === CalendarDisplay.sunday
                ? [calendarSubMenu[1], calendarSubMenu[2], menuOnlyMonth]
                : display === CalendarDisplay.monday
                  ? [calendarSubMenu[0], calendarSubMenu[2], menuOnlyMonth]
                  : [calendarSubMenu[0], calendarSubMenu[1], menuOnlyMonth];
        return [
            {
                id: 'Calendar',
                title: <FormattedMessage id={CalendarLanguage.component.label.router} />,
                icon: <CalendarMonthIcon color="primary" />,
                divide: 'bottom',
                subMenu,
            },
            {
                id: 'sign-out',
                title: <FormattedMessage id={AuthLanguage.component.title.signOut} />,
                icon: <LogoutIcon color="primary" />,
                divide: 'bottom',
                loading: hookSignOut.isPending,
                onClick: () => hookSignOut.mutate({}, { onSuccess: closeMenu }),
            },
        ];
    }, [hookSignOut.isPending, hookSignOut.isAuthentication, display, isOnlyMonth]);

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
});

export default MenuSetting;
