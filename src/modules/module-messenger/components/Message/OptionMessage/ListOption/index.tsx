/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { MenuItem } from '@mui/material';

/** utils */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

/** styles */
import type { ElementClickEvent } from '@module-base/types';

/** types */
type MenuItemProps = {
    id: string;
    icon?: React.ReactNode;
    loading?: boolean;
    title?: React.ReactNode;
    divide?: boolean;
    subMenu?: MenuItemProps[];
    subIndex?: number;
    onClick?(event: ElementClickEvent<HTMLDivElement>, isExpand?: boolean): void;
};

export default function ListOption() {
    const menu = React.useRef<MenuItemProps[]>([
        {
            id: 'reply',
            title: <FormattedMessage id={MessengerLanguage.component.select.reply} />,
            divide: true,
        },
        {
            id: 'forward',
            title: <FormattedMessage id={MessengerLanguage.component.select.forward} />,
            divide: true,
        },
        {
            id: 'copy',
            title: <FormattedMessage id={MessengerLanguage.component.select.copy} />,
            divide: true,
        },
        {
            id: 'revoke',
            title: <FormattedMessage id={MessengerLanguage.component.select.revoke} />,
            divide: true,
        },
        {
            id: 'delete',
            title: <FormattedMessage id={MessengerLanguage.component.select.delete} />,
            divide: true,
        },
    ]).current;

    const itemContent = (item: MenuItemProps) => {
        return <MenuItem key={item.id}>{item.title}</MenuItem>;
    };

    return <>{menu.map(itemContent)}</>;
}
