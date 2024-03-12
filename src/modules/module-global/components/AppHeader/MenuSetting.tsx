/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** lib components */
import { FormattedMessage } from 'react-intl';
import List from '@mui/material/List';

/** lib icons */
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PaletteIcon from '@mui/icons-material/Palette';
import TranslateIcon from '@mui/icons-material/Translate';

/** components */
import NestedItem from '@module-base/components/NestedItem';

/** hooks */
import { useTheme } from '@module-theme/hooks/useTheme.ts';
import { useLanguage } from '@module-language/hooks/useLanguage.ts';
import { useSignOut } from '@module-auth/hooks/useSignOut.ts';

/** types */
import type { NestedItemProps } from '@module-base/models';

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
            title: <FormattedMessage id="module.theme.theme" />,
            icon: <PaletteIcon color="primary" />,
            divide: 'top-bottom',
            subMenu: [
                {
                    id: 'Theme-Dark',
                    title: <FormattedMessage id="module.theme.theme.dark" />,
                    icon: <DarkModeIcon color="disabled" />,
                    onClick: () => THEME.method.setTheme('dark'),
                },
                {
                    id: 'Theme-Light',
                    title: <FormattedMessage id="module.theme.theme.light" />,
                    icon: <LightModeIcon color="warning" />,
                    onClick: () => THEME.method.setTheme('light'),
                },
            ],
        },
        {
            id: 'Language',
            title: <FormattedMessage id="module.language.lang" />,
            icon: <TranslateIcon color="primary" />,
            divide: 'bottom',
            subMenu: [
                {
                    id: 'Language-Vi',
                    title: <FormattedMessage id="module.language.lang.vi" />,
                    icon: (
                        <span style={{ transform: 'scale(1.2)' }} className="w-screen">
                            🇻🇳
                        </span>
                    ),
                    onClick: () => LANGUAGE.method.setLanguage('vi'),
                },
                {
                    id: 'Language-En',
                    title: <FormattedMessage id="module.language.lang.en" />,
                    icon: <span style={{ transform: 'scale(1.2)' }}>🇬🇧</span>,
                    onClick: () => LANGUAGE.method.setLanguage('en'),
                },
            ],
        },
    ]).current;

    const menuSignOut = React.useMemo<NestedItemProps[]>(() => {
        return [
            {
                id: 'sign-out',
                title: <FormattedMessage id="module.auth.form.title.signout" />,
                icon: <LogoutIcon color="primary" />,
                onClick: () => SIGN_OUT.mutate({}, { onSuccess: closeMenu }),
                divide: 'bottom',
                loading: SIGN_OUT.isPending,
            },
        ];
    }, [SIGN_OUT.isPending]);

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
