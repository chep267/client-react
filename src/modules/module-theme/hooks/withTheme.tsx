/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** hooks */
import { useTheme } from '@module-theme/hooks/useTheme';

/** types */
import type { ComponentType } from '@module-base/types';

export function withTheme<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const hookTheme = useTheme();
        return <WrappedComponent {...props} theme={hookTheme} />;
    };
}
