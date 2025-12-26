/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

/** constants */
import { AppSiderState } from '@module-base/constants/AppSiderState';
import { GlobalLanguage } from '@module-global/constants/GlobalLanguage';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** types */
import type { PopperProps } from '@mui/material/Popper';

type PopperInstance = NonNullable<PopperProps['popperRef']> extends React.Ref<infer T> ? T : undefined;

export default function ButtonSider() {
    const popperRef = React.useRef<PopperInstance>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const sider = useSettingStore((store) => store.data.sider);
    const settingAction = useSettingStore((store) => store.action);
    const isExpand = sider === AppSiderState.expand;
    const isForce = sider === AppSiderState.force;
    const tooltipId = isExpand ? GlobalLanguage.component.label.collapse : GlobalLanguage.component.label.expand;
    const SiderIcon = isExpand ? KeyboardDoubleArrowLeftIcon : KeyboardDoubleArrowRightIcon;

    React.useEffect(() => {
        if (!buttonRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            popperRef.current?.update();
        });
        resizeObserver.observe(buttonRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const onChangeSider = () => {
        settingAction.changeSider(isExpand ? AppSiderState.collapse : AppSiderState.expand);
    };

    return (
        <Tooltip
            title={<FormattedMessage id={tooltipId} />}
            placement="right"
            arrow
            slotProps={{
                popper: { popperRef, modifiers: [{ name: 'computeStyles', options: { gpuAcceleration: false } }] },
            }}
        >
            <Button ref={buttonRef} className="w-full min-w-14" disabled={isForce} onClick={onChangeSider}>
                <SiderIcon />
            </Button>
        </Tooltip>
    );
}
