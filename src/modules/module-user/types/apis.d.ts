/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypeCallApiPayload, TypeItemIds, TypeItems } from '@module-base/types';
import type { TypeUser } from '@module-user/types/data.d';

export declare interface TypeUserApi {
    Create: {
        Payload: TypeCallApiPayload<{ user: TypeUser }>;
        Response?: void;
    };
    Get: {
        Payload: TypeCallApiPayload<{ uid: TypeUser['uid'] }>;
        Response?: TypeUser;
    };
    GetList: {
        Payload: TypeCallApiPayload<{ limit?: number }>;
        Response?: { itemIds: TypeItemIds; items: TypeItems<TypeUser> };
    };
}
