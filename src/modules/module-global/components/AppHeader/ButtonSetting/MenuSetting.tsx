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
import { LocaleObject } from '@module-base/constants/LocaleObject';
import { ThemeObject } from '@module-base/constants/ThemeObject';
import { ThemeLanguage } from '@module-base/constants/ThemeLanguage';
import { LangLanguage } from '@module-base/constants/LangLanguage';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useSignout } from '@module-auth/hooks/useSignout';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';
import { useAuthStore } from '@module-auth/stores/useAuthStore';

/** components */
import NestedItem from '@module-base/components/NestedItem';

type MenuSettingProps = {
    closeMenu(event: Event | React.SyntheticEvent): void;
};

const MenuSetting = React.memo<MenuSettingProps>(function MenuSetting(props) {
    const { closeMenu } = props;

    const settingAction = useSettingStore((store) => store.action);
    const user = useAuthStore((store) => store.data.user);
    const isAuthentication = Boolean(user);
    const hookSignout = useSignout();

    const renderMenuBase = React.useMemo(() => {
        const menuBase: App.ModuleBase.Component.NestedItemProps[] = [
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
        ];

        return menuBase.map((item) => <NestedItem key={item.id} {...item} />);
    }, [settingAction]);

    const renderMenuAuth = React.useMemo(() => {
        if (!isAuthentication) {
            return [];
        }
        const menuAuth: App.ModuleBase.Component.NestedItemProps[] = [
            {
                id: 'sign-out',
                title: <FormattedMessage id={AuthLanguage.component.title.signout} />,
                icon: <LogoutIcon color="primary" />,
                divide: 'bottom',
                loading: hookSignout.isPending,
                onClick: (event) => hookSignout.mutate(undefined, { onSettled: () => closeMenu(event) }),
            },
        ];
        return menuAuth.map((item) => <NestedItem key={item.id} {...item} />);
    }, [hookSignout, isAuthentication, closeMenu]);

    return (
        <List component="nav">
            {renderMenuBase}
            {renderMenuAuth}
        </List>
    );
});

export default MenuSetting;
