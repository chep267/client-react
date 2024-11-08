/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** hooks */
import { useNotify } from '@module-base/hooks/useNotify';

/** types */
import type { ComponentType } from '@module-base/types';

export function withNotify<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const notify = useNotify();
        return <WrappedComponent {...props} notify={notify} />;
    };
}
