/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useSider } from './useSider';

/** types */
import type { ComponentType } from 'react';

export function withSider<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const sider = useSider();
        return <WrappedComponent {...props} sider={sider} />;
    };
}
