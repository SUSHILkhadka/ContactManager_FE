import axios from 'axios';
import { URL_TO_BACKEND } from '../constants/common';
import { getAccessToken, getRefreshToken, saveAccessToken } from './localStorage';
const instance = axios.create({
  baseURL: URL_TO_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
  (config) => {
    if (config.headers) config.headers['Authorization'] = 'Bearer ' + getAccessToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.message === 'invalid access token'
      ) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post('/token', {
            refreshToken: getRefreshToken(),
          });
          const { accessToken } = rs.data;
          console.log('new accessToken = ', accessToken);
          saveAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
