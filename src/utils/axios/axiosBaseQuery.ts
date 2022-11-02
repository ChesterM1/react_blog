import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import axios from './axios';

interface QueryFn {
    url: string;
    method?: 'POST' | 'PATCH' | 'GET' | 'DELETE'; //AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
}

export const axiosBaseQuery =
    (): BaseQueryFn<QueryFn, unknown, unknown> =>
    async ({ url, method = 'GET', data, params }) => {
        try {
            const result = await axios({ url, method, data, params }); //baseUrl +
            return { data: result.data };
        } catch (AxiosError) {
            let err = AxiosError as AxiosError;
            return {
                status: err.response?.status,
                data: err.response?.data || err.message,
            };
        }
    };
