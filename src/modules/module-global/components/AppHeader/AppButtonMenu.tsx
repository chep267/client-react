/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as React from 'react';

/** lib components */
import { FormattedMessage } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

/** lib icons */
import MenuIcon from '@mui/icons-material/Menu';

/** components */
import MenuSetting from './MenuSetting.tsx';

/** types */
import type { ElementClickEvent } from '@module-base/models';

export default function AppButtonMenu() {
    const menuId = React.useId();
    const [menuElem, setMenuElem] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuElem);

    const openMenu = React.useCallback((event: ElementClickEvent<HTMLButtonElement>) => setMenuElem(event.currentTarget), []);

    const closeMenu = React.useCallback(() => setMenuElem(null), []);

    return (
        <div>
            <Tooltip title={<FormattedMessage id="module.global.header.button.menu.tooltip" />}>
                <Button
                    className="w-10 min-w-10 h-10 rounded-full p-0 m-0 border-0 hover:border"
                    variant="outlined"
                    id={`button-${menuId}`}
                    aria-controls={open ? `menu-${menuId}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={openMenu}>
                    <MenuIcon />
                </Button>
            </Tooltip>
            <Menu
                id={`menu-${menuId}`}
                anchorEl={menuElem}
                open={open}
                sx={{
                    '& .MuiPaper-root': { top: `70px !important` },
                }}
                onClose={closeMenu}
                MenuListProps={{
                    'aria-labelledby': `button-${menuId}`,
                }}>
                <MenuSetting closeMenu={closeMenu} />
            </Menu>
        </div>
    );
}
