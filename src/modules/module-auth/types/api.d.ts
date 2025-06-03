/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypePayloadApi, TypeResponseApi } from '@module-base/types';
import type { TypeUser } from '@module-user/types';

export interface TypeApiAuth {
    Signin: {
        Payload: TypePayloadApi<{ email: NonNullable<TypeUser['email']>; password: string }>;
        Response: TypeResponseApi<{ user: TypeUser; token: { exp: number } }>;
    };
    SignOut: {
        Payload: TypePayloadApi;
        Response: void;
    };
    Restart: {
        Payload: TypePayloadApi;
        Response: TypeResponseApi<{ user: TypeUser; token: { exp: number } }>;
    };
    Register: {
        Payload: TypePayloadApi<{ email: NonNullable<TypeUser['email']>; password: string }>;
        Response: TypeResponseApi;
    };
    Recover: {
        Payload: TypePayloadApi<{ email: NonNullable<TypeUser['email']> }>;
        Response: TypeResponseApi;
    };
}
