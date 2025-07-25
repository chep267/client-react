/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from '@module-user/types/data.d';
import type * as TypeApi from '@module-user/types/api.d';
import type * as TypeComponent from '@module-user/types/component.d';

declare global {
    namespace App.ModuleUser {
        namespace Data {
            type User = TypeData.TypeUser;
        }
        namespace Api {
            type Get = TypeApi.TypeUserApi['Get'];
            type GetList = TypeApi.TypeUserApi['GetList'];
            type Create = TypeApi.TypeUserApi['Create'];
        }
        namespace Component {
            type UserAvatarProps = TypeComponent.TypeUserAvatarProps;
            type UserNameProps = TypeComponent.TypeUserNameProps;
        }
    }
}
