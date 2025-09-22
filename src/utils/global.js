import axios from 'axios';
import { getCookie } from './cookie';
const service = axios.create({
  baseURL: 'https://whswlibrarysystem.top', //对所有的后端api进行拦截并做对应的操作
  withCredentials: true,
  timeout: 50000,
});

//拦截器，对所有请求加上一个请求头信息
service.interceptors.request.use(
  (config) => {
    const xsrfToken = getCookie('CSRF-TOKEN');
    if (xsrfToken) {
      config.headers['X-CSRF-TOKEN'] = xsrfToken;
    } else {
      config.headers['X-CSRF-TOKEN'] = '';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
