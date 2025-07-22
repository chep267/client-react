/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@module-base/types/data.d';
import type * as TypeHook from '@module-base/types/hook.d';
import type * as TypeComponent from '@module-base/types/component.d';
import type * as TypeStore from '@module-base/types/store.d';

declare global {
    namespace App {
        namespace ModuleBase {
            namespace Data {
                type ItemIds = TypeData.TypeItemIds;
                type Items<Data = any> = TypeData.TypeItems<Data>;
                type StorageName = TypeData.TypeStorageName;
                type StorageValue = TypeData.TypeStorageValue;
            }
            namespace Hook {
                type UseCountdownProps = TypeHook.TypeUseCountdownProps;
                type UseListSearchProps = TypeHook.TypeUseListSearchProps;
            }
            namespace Store {
                type Theme = TypeStore.TypeTheme;
                type Locale = TypeStore.TypeLocale;
                type LanguageMessages = TypeStore.TypeLanguageMessages;
                type SiderState = TypeStore.TypeSiderState;
                type SettingStore = TypeStore.TypeSettingStore;
            }
            namespace Component {
                type InputElement = TypeComponent.TypeInputElem;
                type ErrorBoundaryProps = TypeComponent.TypeErrorBoundaryProps;
                type ErrorBoundaryStates = TypeComponent.TypeErrorBoundaryStates;
                type FallbackDefaultProps = TypeComponent.TypeFallbackDefaultProps;

                type NotifyBoundaryProps = TypeComponent.TypeNotifyBoundaryProps;

                type IconBaseProps = TypeComponent.TypeIconBaseProps;
                type IconSVGProps = TypeComponent.TypeIconSVGProps;
                type IconList = TypeComponent.TypeIconList;

                type ImageBaseProps = TypeComponent.TypeImageBaseProps;
                type InputSearchProps = TypeComponent.TypeInputSearchProps;
                type PasswordFieldProps = TypeComponent.TypePasswordFieldProps;
                type MenuBaseProps = TypeComponent.TypeMenuBaseProps;

                type OrderType = TypeComponent.TypeOrderType;
                type TableData = TypeComponent.TypeTableData;
                type DataKey<Data extends TableData> = TypeComponent.TypeDataKey<Data>;

                type ListBaseProps<Data> = TypeComponent.TypeListBaseProps<Data>;
                type NestedItemProps = TypeComponent.TypeNestedItemProps;
                type VirtualListProps<Data, Context> = TypeComponent.TypeVirtualListProps<Data, Context>;

                type TableBaseProps<Data extends TableData = TableData> = TypeComponent.TypeTableBaseProps<Data>;
                type TableHeaderProps<Data extends TableData = TableData> = TypeComponent.TypeTableHeaderProps<Data>;
                type TableContentProps<Data extends TableData = TableData> = TypeComponent.TypeTableContentProps<Data>;
                type CheckboxColumnProps = TypeComponent.TypeCheckboxColumnProps;
                type VirtualTableProps<
                    Data extends TableData = TableData,
                    Context = any,
                > = TypeComponent.TypeVirtualTableProps<Data, Context>;
            }
        }
    }
}
