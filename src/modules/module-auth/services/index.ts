/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** services */
import { BaseServices } from '@module-base/services';

class AuthServices extends BaseServices {
    constructor(url = '/api/auth') {
        super(url);
    }
    private signin = () => {
        return this.post<>();
    };
}

export const authServices = new AuthServices();
