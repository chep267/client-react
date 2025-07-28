/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

export default function MenuBase(props: App.ModuleBase.Component.MenuBaseProps) {
    const { buttonChildren, menuChildren, buttonProps, tooltipProps, menuProps } = props;

    const menuId = React.useId();
    const [menuElem, setMenuElem] = React.useState<HTMLElement | null>(null);
    const open = Boolean(menuElem);

    const closeMenu = React.useCallback<
        NonNullable<NonNullable<App.ModuleBase.Component.MenuBaseProps['menuProps']>['onClose']>
    >((event, reason) => {
        setMenuElem(null);
        menuProps?.onClose?.(event, reason);
    }, []);

    const renderButton = () => {
        const Content = (
            <Button
                {...buttonProps}
                id={`button-menu-${menuId}`}
                aria-haspopup="true"
                onClick={(event) => setMenuElem(event.currentTarget)}
            >
                {buttonChildren}
            </Button>
        );
        if (!tooltipProps) {
            return Content;
        }
        return <Tooltip {...tooltipProps}>{Content}</Tooltip>;
    };

    return (
        <>
            {renderButton()}
            <Menu {...menuProps} id={`menu-${menuId}`} anchorEl={menuElem} open={open} onClose={closeMenu}>
                {typeof menuChildren === 'function' ? menuChildren({ closeMenu }) : menuChildren}
            </Menu>
        </>
    );
}
