/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

/** types */
import type { ElementClickEvent, MenuBaseProps } from '@module-base/types';

export default function MenuBase(props: MenuBaseProps) {
    const { buttonChildren, menuChildren, buttonProps, tooltipProps, menuProps } = props;

    const menuId = React.useId();
    const [menuElem, setMenuElem] = React.useState<HTMLElement | null>(null);
    const open = Boolean(menuElem);

    const openMenu = React.useCallback((event: ElementClickEvent<HTMLButtonElement>) => setMenuElem(event.currentTarget), []);

    const closeMenu = React.useCallback<NonNullable<NonNullable<MenuBaseProps['menuProps']>['onClose']>>((event, reason) => {
        setMenuElem(null);
        menuProps?.onClose?.(event, reason);
    }, []);

    const renderButton = () => {
        const renderContent = () => {
            return (
                <Button {...buttonProps} id={`button-menu-${menuId}`} aria-haspopup="true" onClick={openMenu}>
                    {buttonChildren}
                </Button>
            );
        };
        if (!tooltipProps) {
            return renderContent();
        }
        return <Tooltip {...tooltipProps}>{renderContent()}</Tooltip>;
    };

    return (
        <div>
            {renderButton()}
            <Menu {...menuProps} id={`menu-${menuId}`} anchorEl={menuElem} open={open} onClose={closeMenu}>
                {typeof menuChildren === 'function' ? menuChildren({ closeMenu: () => setMenuElem(null) }) : menuChildren}
            </Menu>
        </div>
    );
}
