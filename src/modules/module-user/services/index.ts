/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { UserApiPath } from '@module-user/constants/UserApiPath';

/** services */
import { BaseServices } from '@module-base/services';

class UserServices extends BaseServices {
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
}

export const userServices = new UserServices();
