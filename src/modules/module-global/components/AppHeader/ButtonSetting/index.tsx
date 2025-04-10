/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import MenuIcon from '@mui/icons-material/Menu';

/** constants */
import { ScreenSize } from '@module-base/constants/ScreenSize';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** components */
import MenuBase from '@module-base/components/MenuBase';
import MenuSetting from './MenuSetting';

export default function ButtonSetting() {
    return (
        <MenuBase
            tooltipProps={{ title: <FormattedMessage id={GlobalLanguage.component.label.setting} /> }}
            buttonProps={{
                className: clsx(
                    'm-0 h-10 w-10 min-w-10 rounded-full border-0 p-0',
                    'hover:border',
                    'text-tw-primary',
                    'desktop:text-white'
                ),
                'aria-label': 'setting',
            }}
            menuProps={{
                sx: {
                    '& .MuiPaper-root': { top: `${ScreenSize.HeaderHeight + 4}px !important` },
                },
            }}
            buttonChildren={<MenuIcon />}
            menuChildren={({ closeMenu }) => <MenuSetting closeMenu={closeMenu} />}
        />
    );
}
