/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** hooks */
import { useSider } from './useSider';

/** types */
import type { ComponentType } from '@module-base/types';

export function withSider<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const sider = useSider();
        return <WrappedComponent {...props} sider={sider} />;
    };
}
