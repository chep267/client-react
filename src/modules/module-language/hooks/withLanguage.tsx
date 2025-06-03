/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useLanguage } from '@module-language/hooks/useLanguage';

/** types */
import type { ComponentType } from 'react';

export function withLanguage<Props>(WrappedComponent: ComponentType<Props>) {
    return function EnhancedComponent(props: Props) {
        const hookLanguage = useLanguage();
        return <WrappedComponent {...props} language={hookLanguage} />;
    };
}
