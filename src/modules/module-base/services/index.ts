/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** apis */
import { axiosClient } from '@module-base/apis';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { delay as funcDelay } from '@module-base/utils/delay';

/** types */
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

export class BaseService {
    protected readonly url: string;
    protected readonly delay: number;

    constructor(url: string = '', delay: number = AppTimer.pendingApi) {
        this.url = url;
        this.delay = delay;
    }

    private concatUrl = (url: string = '') => {
        return this.url + url;
    };

    public withDelay = async <Res = unknown>(promise: Promise<Res>, delay = this.delay): Promise<Res> => {
        const [res] = await Promise.all([promise, funcDelay(delay)]);
        return res;
    };

    public get = async <Res = unknown>(configs?: AxiosRequestConfig) => {
        return axiosClient.get<Res, AxiosResponse<Res>>(this.concatUrl(configs?.url), configs);
    };

    public post = <Res = unknown, Body = unknown>(
        body: Body,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<Res>> => {
        return axiosClient.post<Res, AxiosResponse<Res>, Body>(this.concatUrl(configs?.url), body, configs);
    };

    public put = <Res = unknown, Body = unknown>(
        body: Body,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<Res>> => {
        return axiosClient.put<Res, AxiosResponse<Res>, Body>(this.concatUrl(configs?.url), body, configs);
    };

    public patch = <Res = unknown, Body = unknown>(
        body: Body,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<Res>> => {
        return axiosClient.patch<Res, AxiosResponse<Res>, Body>(this.concatUrl(configs?.url), body, configs);
    };

    public delete = (configs?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return axiosClient.delete(this.concatUrl(configs?.url), configs);
    };
}
