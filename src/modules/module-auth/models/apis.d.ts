/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypeCallApiPayload } from '@module-base/models';
import type { TypeUser } from '@module-user/models';

export interface TypeApiAuth {
    Signin: {
        Payload: TypeCallApiPayload<{ email: string; password: string }>;
        Response: { user: TypeUser };
    };
    Signout: {
        Payload: TypeCallApiPayload;
        Response: void;
    };
    Restart: {
        Payload: TypeCallApiPayload;
        Response: unknown;
    };
}
