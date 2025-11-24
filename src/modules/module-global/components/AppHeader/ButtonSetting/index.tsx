/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';

/** constants */
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** components */
import MenuSetting from '@module-global/components/AppHeader/ButtonSetting/MenuSetting';

export default function ButtonSetting() {
    const menuId = React.useId();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={<FormattedMessage id={GlobalLanguage.component.label.setting} />} arrow>
                <Button
                    id={`button-${menuId}`}
                    aria-controls={`menu-${menuId}`}
                    aria-haspopup="true"
                    aria-label="setting"
                    aria-describedby={`popper-${menuId}`}
                    className={clsx('m-0 h-10 w-10 min-w-10', 'rounded-full border-0 p-0 text-inherit', 'hover:border')}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </Button>
            </Tooltip>

            <Popper className="!top-3.5" id={`popper-${menuId}`} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} className="origin-top-right">
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id={`menu-${menuId}`}
                                    aria-labelledby={`button-${menuId}`}
                                    autoFocusItem={open}
                                >
                                    <MenuSetting closeMenu={handleClose} />
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
