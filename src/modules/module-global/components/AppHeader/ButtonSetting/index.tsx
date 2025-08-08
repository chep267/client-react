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
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={<FormattedMessage id={GlobalLanguage.component.label.setting} />} arrow>
                <Button
                    ref={anchorRef}
                    id={`button-${menuId}`}
                    aria-controls={`menu-${menuId}`}
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-label="setting"
                    className={clsx('m-0 h-10 w-10 min-w-10 rounded-full border-0 p-0 text-inherit', 'hover:border')}
                    onClick={handleToggle}
                >
                    <MenuIcon />
                </Button>
            </Tooltip>
            <Popper
                className="!top-3.5"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-end"
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} className="origin-top-right">
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id={`menu-${menuId}`}
                                    aria-labelledby={`button-${menuId}`}
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
