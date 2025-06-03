/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** types */
import type { ComponentType } from '@module-base/types';

export function withMessenger<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const messenger = useMessenger();
        return <WrappedComponent {...props} messenger={messenger} />;
    };
}
