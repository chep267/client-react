/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export type TypeCallApiDelay = { timer?: number };

export type TypeCallApiPayload<Data = unknown> = TypeCallApiDelay & Data;

export type TypeResponseApi<Data = unknown> = {
    message: string;
    status: string | number;
    data: Data;
};
