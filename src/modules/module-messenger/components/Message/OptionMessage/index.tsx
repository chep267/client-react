/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** libs */
import { FormattedMessage } from 'react-intl';

/** icons */
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';

/** components */
import MenuBase from '@module-base/components/MenuBase';
import ListOption from './ListOption';

/** utils */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

/** types */
import type { MenuBaseProps } from '@module-base/types';

const OptionMessage = React.memo(() => {
    const tooltipProps = React.useRef<MenuBaseProps['tooltipProps']>({
        title: <FormattedMessage id={MessengerLanguage.component.label.message.option} />,
        placement: 'top',
    }).current;

    const iconButtonProps = React.useRef<MenuBaseProps['iconButtonProps']>({
        className: 'button-option-message',
    }).current;

    const menuProps = React.useRef<MenuBaseProps['menuProps']>({
        children: <ListOption />,
    }).current;

    return (
        <MenuBase
            tooltipProps={tooltipProps}
            iconButtonProps={iconButtonProps}
            menuProps={menuProps}
            buttonChildren={<MoreHorizIcon color="primary" />}
        />
    );
});

export default OptionMessage;
