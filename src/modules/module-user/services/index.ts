/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { UserApiPath } from '@module-user/constants/UserApiPath';

/** services */
import { BaseService } from '@module-base/services';

class UserServices extends BaseService {
    constructor(url = UserApiPath.root) {
        super(url);
    }

    public create = (data: App.ModuleUser.Api.Create['Payload']) => {
        return this.withDelay(
            this.post<App.ModuleUser.Api.Create['Response'], App.ModuleUser.Api.Create['Payload']>(data, {
                url: UserApiPath.create,
            })
        );
    };
    public getList = (params?: App.ModuleUser.Api.GetList['Payload']) => {
        return this.withDelay(
            this.get<App.ModuleUser.Api.GetList['Response']>({
                url: UserApiPath.getList,
                params,
            })
        );
    };
}

export const userServices = new UserServices();
