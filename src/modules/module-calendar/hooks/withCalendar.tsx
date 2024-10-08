/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** hooks */
import { useCalendar } from '@module-calendar/hooks/useCalendar';

/** types */
import type { ComponentType } from '@module-base/types';

export function withCalendar<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const calendar = useCalendar();
        return <WrappedComponent {...props} calendar={calendar} />;
    };
}
