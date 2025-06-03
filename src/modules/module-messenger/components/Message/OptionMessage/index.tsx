/**
 *
 * @author dongntd267@gmail.com
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

    const buttonProps = React.useRef<MenuBaseProps['buttonProps']>({
        className: 'button-option-message',
    }).current;

    const menuProps = React.useRef<MenuBaseProps['menuProps']>({
        children: <ListOption />,
    }).current;

    return (
        <MenuBase
            tooltipProps={tooltipProps}
            buttonProps={buttonProps}
            menuProps={menuProps}
            buttonChildren={<MoreHorizIcon color="primary" />}
        />
    );
});

export default OptionMessage;
