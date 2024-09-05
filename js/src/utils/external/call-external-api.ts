import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../../main/config/env';

interface ApiCallOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    data?: any;
    timeout?: number; // Optional timeout in milliseconds
}


export default class CallExternalApi {

    static async getAuthMs(): Promise<any> {
        const auth = await callApi({
            method: 'GET',
            url: env.AUTH_MS_URL,

        })
        return auth.data
    }

    static async notifyMs(): Promise<any> {
        const notify = await callApi({
            method: 'GET',
            url: env.NOTIFY_MS_URL,

        })
        return notify
    }
 
    
}

const callApi = async <T>(options: ApiCallOptions): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = {
        method: options.method,
        url: options.url,
        headers: options.headers,
        params: options.params,
        data: options.data,
        timeout: options.timeout || 5000, // Default timeout of 5 seconds
    };

    const response = await axios.request<T>(config);
    return response;
}
