import axios from 'axios';

export const FGC_API_URL = 'http://localhost:8080/api';
export function getFgcApiInstance() {
  return axios.create({
    baseURL: FGC_API_URL,
    withCredentials: true,
  });
}
export const fgcApi = getFgcApiInstance();

export const FGC_API_URLS = {
  LOGIN: '/v1/users/login',
  REFRESH_TOKEN: '/v1/users/refresh',
  SIGNUP: '/v1/users',
  ME: '/v1/users/me',
  OAUTH_LOGIN: '/v1/users/oauth/login',
};
