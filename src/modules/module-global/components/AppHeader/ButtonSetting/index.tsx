/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** components */
import MenuSetting from './MenuSetting';

/** types */
import type { ElementClickEvent } from '@module-base/types';

export default function ButtonSetting() {
    const menuId = React.useId();
    const menuStyle = React.useRef({
        '& .MuiPaper-root': { top: `${ScreenSize.HeaderHeight + 4}px !important` },
    }).current;

    const [menuElem, setMenuElem] = React.useState<HTMLElement | null>(null);
    const open = Boolean(menuElem);

    const openMenu = React.useCallback((event: ElementClickEvent<HTMLButtonElement>) => setMenuElem(event.currentTarget), []);

    const closeMenu = React.useCallback(() => setMenuElem(null), []);

    return (
        <div>
            <Tooltip title={<FormattedMessage id={GlobalLanguage.component.label.setting} />}>
                <Button
                    id={`button-${menuId}`}
                    className={classnames('m-0 h-10 w-10 !min-w-10 !rounded-full !border-0 p-0', 'hover:!border')}
                    variant="outlined"
                    aria-controls={open ? `menu-${menuId}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={openMenu}
                >
                    <MenuIcon />
                </Button>
            </Tooltip>
            <Menu id={`menu-${menuId}`} anchorEl={menuElem} open={open} sx={menuStyle} onClose={closeMenu}>
                <MenuSetting closeMenu={closeMenu} />
            </Menu>
        </div>
    );
}
