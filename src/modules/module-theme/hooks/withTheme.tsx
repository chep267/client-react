/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** hooks */
import { useTheme } from '@module-theme/hooks/useTheme.ts';

/** types */
import type { ComponentType } from '@module-base/types';

export function withTheme<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const theme = useTheme();
        return <WrappedComponent {...props} theme={theme} />;
    };
}
