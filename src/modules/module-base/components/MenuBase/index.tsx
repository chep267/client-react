/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';

/** types */
import type { ElementClickEvent, MenuBaseProps } from '@module-base/types';

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        '&::-webkit-scrollbar': {
            width: '7px',
            height: '7px',
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: '10px',
            backgroundColor: alpha(theme.palette.common.black, 0.1),
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundColor: alpha(theme.palette.common.black, 0.2),
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.4),
        },
        '&::-webkit-scrollbar-thumb:active': {
            backgroundColor: alpha(theme.palette.common.black, 0.9),
        },
    },
}));

const MenuBase = React.memo(function MenuBase(props: MenuBaseProps) {
    const { buttonChildren, menuChildren, iconButtonProps, tooltipProps, menuProps } = props;

    const menuId = React.useId();
    const [menuElem, setMenuElem] = React.useState<HTMLElement | null>(null);
    const open = Boolean(menuElem);

    const openMenu = React.useCallback((event: ElementClickEvent<HTMLButtonElement>) => setMenuElem(event.currentTarget), []);

    const closeMenu: NonNullable<MenuBaseProps['menuProps']>['onClose'] = (event, reason) => {
        setMenuElem(null);
        menuProps?.onClose?.(event, reason);
    };

    const renderButton = () => {
        const Button = () => {
            return (
                <IconButton {...iconButtonProps} id={`button-menu-${menuId}`} aria-haspopup="true" onClick={openMenu}>
                    {buttonChildren}
                </IconButton>
            );
        };
        if (!tooltipProps) {
            return Button();
        }
        return <Tooltip {...tooltipProps}>{Button()}</Tooltip>;
    };

    return (
        <div>
            {renderButton()}
            <StyledMenu {...menuProps} id={`menu-${menuId}`} anchorEl={menuElem} open={open} onClose={closeMenu}>
                {menuChildren}
            </StyledMenu>
        </div>
    );
});

export default MenuBase;
