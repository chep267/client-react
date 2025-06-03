/**
 *
 * @author dongntd267@gmail.com
 *
 */

export interface TypeUserApi {
    Create: {
        Payload: App.ModuleBase.Api.Payload<{ user: App.ModuleUser.Data.User }>;
        Response?: void;
    };
    Get: {
        Payload: App.ModuleBase.Api.Payload<{ uid: App.ModuleUser.Data.User['uid'] }>;
        Response?: App.ModuleUser.Data.User;
    };
    GetList: {
        Payload: App.ModuleBase.Api.Payload<{ limit?: number }>;
        Response?: { itemIds: App.ModuleBase.Data.ItemIds; items: App.ModuleBase.Data.Items<TypeUser> };
    };
}
