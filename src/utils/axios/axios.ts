import axiosLib, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { getLocalStorage } from '../serviceLocalStorage';
const URL = process.env.REACT_APP_BASE_URL;

const axios = axiosLib.create({
    baseURL: URL,
});

const token = getLocalStorage('user')?.token ?? '';

axios.interceptors.request.use((config: AxiosRequestConfig<AxiosRequestHeaders>) => {
    if (config.headers) {
        config.headers.Authorization = token;
    }
    return config;
});

export default axios;
