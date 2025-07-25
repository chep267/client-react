/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeItemIds, TypeItems } from '@module-base/types/data.d';
import type { TypeUser } from '@module-user/types/data.d';

export interface TypeUserApi {
    Create: {
        Payload: { user: TypeUser };
        Response?: void;
    };
    Get: {
        Payload: { uid: TypeUser['uid'] };
        Response?: TypeUser;
    };
    GetList: {
        Payload?: { limit?: number };
        Response?: { itemIds: TypeItemIds; items: TypeItems<TypeUser> };
    };
}
