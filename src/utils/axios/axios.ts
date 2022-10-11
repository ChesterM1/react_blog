import axiosLib, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { getLocalStorage } from '../serviceLocalStorage';

const axios = axiosLib.create({
    baseURL: 'https://node-blog-api2.herokuapp.com/', //https://node-blog-api2.herokuapp.com/ //http://localhost:4444/
});

axios.interceptors.request.use((config: AxiosRequestConfig<AxiosRequestHeaders>) => {
    if (config.headers) {
        config.headers.Authorization = getLocalStorage('user')?.token || '';
    }
    return config;
});

export default axios;
