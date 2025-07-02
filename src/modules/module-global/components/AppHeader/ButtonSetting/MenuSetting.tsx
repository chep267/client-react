/**
 *
 * @author dongntd267@gmail.com
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

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { LocaleObject } from '@module-base/constants/LocaleObject';
import { ThemeObject } from '@module-base/constants/ThemeObject';
import { ThemeLanguage } from '@module-base/constants/ThemeLanguage';
import { LangLanguage } from '@module-base/constants/LangLanguage';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useSignOut } from '@module-auth/hooks/useSignOut';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** components */
import NestedItem from '@module-base/components/NestedItem';

type Props = {
    closeMenu(): void;
};

const MenuSetting = React.memo(function MenuSetting(props: Props) {
    const { closeMenu } = props;

    const settingAction = useSettingStore((store) => store.action);
    const hookSignOut = useSignOut();

    const menuBase = React.useRef<App.ModuleBase.Component.NestedItemProps[]>([
        {
            id: 'Theme',
            title: <FormattedMessage id={ThemeLanguage.component.label.router} />,
            icon: <PaletteIcon />,
            divide: 'top-bottom',
            subMenu: [
                {
                    id: 'Theme-Dark',
                    title: <FormattedMessage id={ThemeLanguage.component.label.dark} />,
                    icon: <DarkModeIcon color="disabled" />,
                    onClick: () => settingAction.changeTheme(ThemeObject.dark),
                },
                {
                    id: 'Theme-Light',
                    title: <FormattedMessage id={ThemeLanguage.component.label.light} />,
                    icon: <LightModeIcon color="warning" />,
                    onClick: () => settingAction.changeTheme(ThemeObject.light),
                },
            ],
        },
        {
            id: 'Language',
            title: <FormattedMessage id={LangLanguage.component.label.router} />,
            icon: <TranslateIcon />,
            divide: 'bottom',
            subMenu: [
                {
                    id: 'Language-Vi',
                    title: <FormattedMessage id={LangLanguage.component.label.vi} />,
                    icon: <span className="scale-125 text-black">🇻🇳</span>,
                    onClick: () => settingAction.changeLocale(LocaleObject.vi),
                },
                {
                    id: 'Language-En',
                    title: <FormattedMessage id={LangLanguage.component.label.en} />,
                    icon: <span className="scale-125 text-black">🇬🇧</span>,
                    onClick: () => settingAction.changeLocale(LocaleObject.en),
                },
            ],
        },
    ]);

    const menuAuth = React.useMemo<App.ModuleBase.Component.NestedItemProps[]>(() => {
        if (!hookSignOut.isAuthentication) {
            return AppDefaultValue.emptyArray;
        }
        return [
            {
                id: 'sign-out',
                title: <FormattedMessage id={AuthLanguage.component.title.signOut} />,
                icon: <LogoutIcon color="primary" />,
                divide: 'bottom',
                loading: hookSignOut.isPending,
                onClick: () => hookSignOut.mutate({}, { onSuccess: closeMenu }),
            },
        ];
    }, [hookSignOut.isPending, hookSignOut.isAuthentication]);

    const renderMenuBase = React.useMemo(() => {
        return menuBase.current.map((item) => <NestedItem key={item.id} {...item} />);
    }, []);

    const renderMenuAuth = React.useMemo(() => {
        return menuAuth.map((item) => <NestedItem key={item.id} {...item} />);
    }, [menuAuth]);

    return (
        <List component="nav">
            {renderMenuBase}
            {renderMenuAuth}
        </List>
    );
});

export default MenuSetting;
