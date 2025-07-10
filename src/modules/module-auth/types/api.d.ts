/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypeUser } from '@module-user/types';

export interface TypeApiAuth {
    Signin: {
        Payload: { email: string; password: string };
        Response: { user: TypeUser; token: { exp: number } };
    };
    Signout: {
        Payload: { uid: string };
        Response: null;
    };
    Restart: {
        Payload: { uid: string };
        Response: { user: TypeUser; token: { exp: number } };
    };
    Register: {
        Payload: { email: string; password: string };
        Response: null;
    };
    Recover: {
        Payload: { email: string };
        Response: null;
    };
}
