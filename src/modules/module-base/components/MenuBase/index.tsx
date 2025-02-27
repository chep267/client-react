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

/** types */
import type { ElementClickEvent, MenuBaseProps } from '@module-base/types';

const MenuBase = React.memo(function MenuBase(props: MenuBaseProps) {
    const { buttonChildren, menuChildren, iconButtonProps, tooltipProps, menuProps } = props;

    const menuId = React.useId();
    const [menuElem, setMenuElem] = React.useState<HTMLElement | null>(null);
    const open = Boolean(menuElem);

    const openMenu = React.useCallback((event: ElementClickEvent<HTMLButtonElement>) => setMenuElem(event.currentTarget), []);

    const closeMenu = React.useCallback<NonNullable<NonNullable<MenuBaseProps['menuProps']>['onClose']>>((event, reason) => {
        setMenuElem(null);
        menuProps?.onClose?.(event, reason);
    }, []);

    // const styleMenuBase = React.useMemo<SxProps<Theme>>(
    //     () => ({
    //         '& .MuiPaper-root': {
    //             '&::-webkit-scrollbar': {
    //                 width: '7px',
    //                 height: '7px',
    //             },
    //             '&::-webkit-scrollbar-track': {
    //                 borderRadius: '10px',
    //                 backgroundColor: (theme) => alpha(theme.palette.common.black, 0.1),
    //             },
    //             '&::-webkit-scrollbar-thumb': {
    //                 borderRadius: '10px',
    //                 backgroundColor: (theme) => alpha(theme.palette.common.black, 0.2),
    //                 '&:hover': {
    //                     backgroundColor: (theme) => alpha(theme.palette.common.black, 0.4),
    //                 },
    //                 '&:active': {
    //                     backgroundColor: (theme) => alpha(theme.palette.common.black, 0.9),
    //                 },
    //             },
    //         },
    //     }),
    //     []
    // );

    const Button = React.useMemo(() => {
        const renderContent = () => {
            return (
                <IconButton {...iconButtonProps} id={`button-menu-${menuId}`} aria-haspopup="true" onClick={openMenu}>
                    {buttonChildren}
                </IconButton>
            );
        };
        if (!tooltipProps) {
            return renderContent();
        }
        return <Tooltip {...tooltipProps}>{renderContent()}</Tooltip>;
    }, [tooltipProps, iconButtonProps]);

    return (
        <div>
            {Button}
            <Menu {...menuProps} id={`menu-${menuId}`} anchorEl={menuElem} open={open} onClose={closeMenu}>
                {typeof menuChildren === 'function' ? menuChildren({ closeMenu: () => setMenuElem(null) }) : menuChildren}
            </Menu>
        </div>
    );
});

export default MenuBase;
