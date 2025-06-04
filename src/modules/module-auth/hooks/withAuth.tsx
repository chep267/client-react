/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useAuth } from '@module-auth/hooks/useAuth';

/** types */
import type { ComponentType } from 'react';

export function withAuth<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const auth = useAuth();
        return <WrappedComponent {...props} auth={auth} />;
    };
}
