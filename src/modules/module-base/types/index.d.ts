/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from './data.d';
import type * as TypeApi from './api.d';
import type * as TypeHook from './hook.d';
import type * as TypeComponent from './component.d';

declare global {
    namespace App {
        namespace ModuleBase {
            namespace Data {
                type ItemIds = TypeData.TypeItemIds;
                type Items<Data = any> = TypeData.TypeItems<Data>;
                type StorageName = TypeData.TypeStorageName;
                type StorageValue = TypeData.TypeStorageValue;
            }
            namespace Api {
                type Payload<Data = unknown> = TypeApi.TypePayloadApi<Data>;
                type Response<Data = unknown> = TypeApi.TypeResponseApi<Data>;
            }
            namespace Hook {
                type Notify = TypeHook.TypeNotify;
                type NotifyContext = TypeHook.TypeNotifyContext;
                type SiderState = TypeHook.TypeSiderState;
                type SiderContext = TypeHook.TypeSiderContext;
                type UseCountdownProps = TypeHook.TypeUseCountdownProps;
                type UseListSearchProps = TypeHook.TypeUseListSearchProps;
            }
            namespace Component {
                type InputElement = TypeComponent.TypeInputElem;
                type ErrorBoundaryProps = TypeComponent.TypeErrorBoundaryProps;
                type ErrorBoundaryStates = TypeComponent.TypeErrorBoundaryStates;
                type FallbackDefaultProps = TypeComponent.TypeFallbackDefaultProps;

                type SiderProviderProps = TypeComponent.TypeSiderProviderProps;
                type NotifyProviderProps = TypeComponent.TypeNotifyProviderProps;
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
