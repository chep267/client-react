/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** services */
import { BaseServices } from '@module-base/services';

class UserServices extends BaseServices {
    constructor(url = '/api/user') {
        super(url);
    }
}

export const userServices = new UserServices();
