/**
 *
 * @author dongntd267@gmail.com
 *
 */

export type TypePayloadApi<Data = unknown> = { timer?: number } & Data;

export type TypeResponseApi<Data = unknown> = {
    message: string;
    status: number;
    data: Data;
};
