/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export type TypeCallApidelay = { timer?: number };

export type TypeCallApiPayload<Data = unknown> = TypeCallApidelay & Data;

export type TypeResponseApi<Data = unknown> = {
    message: string;
    status: string | number;
    data: Data;
};
