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

/** constants */
import { localeObject } from '@module-language/constants/localeObject.ts';
import { themeObject } from '@module-theme/constants/themeObject.ts';

/** hooks */
import { useTheme } from '@module-theme/hooks/useTheme.ts';
import { useLanguage } from '@module-language/hooks/useLanguage.ts';
import { useSignOut } from '@module-auth/hooks/useSignOut.ts';

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
    const SIGN_OUT = useSignOut();

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
                    onClick: () => LANGUAGE.method.setLanguage(localeObject.vi),
                },
            ],
        },
    ]).current;

    const menuSignOut = React.useMemo<NestedItemProps[]>(
        () => [
            {
                id: 'sign-out',
                title: <FormattedMessage id="module.auth.form.title.signout" />,
                icon: <LogoutIcon color="primary" />,
                divide: 'bottom',
                loading: SIGN_OUT.isPending,
                onClick: () => SIGN_OUT.mutate({}, { onSuccess: closeMenu }),
            },
        ],
        [SIGN_OUT.isPending]
    );

    const renderMenuBase = React.useMemo(() => {
        return menuBase.map((item) => <NestedItem key={item?.id} {...item} />);
    }, []);

    const renderMenuSignOut = React.useMemo(() => {
        return menuSignOut.map((item) => <NestedItem key={item?.id} {...item} />);
    }, [menuSignOut]);

    return (
        <List component="nav">
            {renderMenuBase}
            {SIGN_OUT.isAuthentication ? renderMenuSignOut : null}
        </List>
    );
}
