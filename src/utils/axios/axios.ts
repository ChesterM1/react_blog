import axiosLib, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const axios = axiosLib.create({
    baseURL: 'http://localhost:4444/',
});

axios.interceptors.request.use((config: AxiosRequestConfig<AxiosRequestHeaders>) => {
    if (config.headers) {
        console.log(config);
        config.headers.Authorization =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFmOTRiZTNiNjdmYzI3ZTNmMGQzMDUiLCJpYXQiOjE2NjMwMTQwNzgsImV4cCI6MTY2NTYwNjA3OH0.yE6fNXoQjQ8ClbfpWgXR2MFH92U9LDbs5JM2SoZW3g0';
    }
    return config;
});

export default axios;
