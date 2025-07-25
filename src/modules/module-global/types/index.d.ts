/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeComponent from '@module-global/types/component.d';

declare global {
    namespace App {
        namespace ModuleGlobal {
            namespace Component {
                type AppItem = TypeComponent.TypeAppItem;
                type ListAppProps = TypeComponent.ListAppProps;
                type AppItemProps = TypeComponent.AppItemProps;
            }
        }
    }
}
