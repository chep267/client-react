/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';

/** types */
import type { ComponentType } from 'react';

export function withNotify<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const notify = useNotify();
        return <WrappedComponent {...props} notify={notify} />;
    };
}
